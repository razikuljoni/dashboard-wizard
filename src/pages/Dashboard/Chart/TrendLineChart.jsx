import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import ChartHeader from "./ChartHeader";

const TrendLineChart = ({
    data,
    title,
    id,
    dataKey = "presentAttendees",
    labelKey = "day",
    showPercentage = false,
    color = "#E362B0",
}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            setChartData(
                data?.map(x => ({
                    label: x[labelKey],
                    value: x[dataKey],
                }))
            );
        }
    }, [data, dataKey, labelKey]);

    // if (!data?.length) return null;

    const xAxisData = chartData?.map(item => item.label);
    const seriesData = chartData?.map(item => item.value);

    const options = {
        tooltip: {
            trigger: "axis",
            formatter: params => {
                const point = params[0];
                return `${point.name}: ${point.value}${showPercentage ? "%" : ""}`;
            },
        },
        xAxis: {
            type: "category",
            data: xAxisData,
            boundaryGap: false,
            axisLabel: {
                fontSize: 12,
                color: "rgba(0, 0, 0, 0.6)",
            },
            axisLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.1)" },
            },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 12,
                formatter: showPercentage ? "{value}%" : "{value}",
            },
            splitLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.05)" },
            },
        },
        grid: {
            left: "5%",
            right: "5%",
            top: "10%",
            bottom: "10%",
        },
        series: [
            {
                data: seriesData,
                type: "line",
                symbol: "circle",
                symbolSize: 10,
                lineStyle: { width: 0 },
                itemStyle: {
                    color: color,
                    borderColor: "#FFFFFF",
                    borderWidth: 2,
                },
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: color },
                            { offset: 1, color: `${color}00` }, // Transparent version of the color
                        ],
                    },
                },
            },
        ],
    };

    return (
        <div className="p-2" id={id}>
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title={title}
                    cssId={id}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={data} // Use original data for CSV
                    extended
                />

                <ReactECharts option={options} style={{ height: "300px", width: "100%" }} />
            </div>
        </div>
    );
};

export default TrendLineChart;
