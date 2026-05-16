// Average Strike Rate By Geography Bar Chart
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";
import ChartHeader from "../../ChartHeader";

const AverageStrikeRateByGeo = ({ data, title, id }) => {
    const chartData = useMemo(
        () => data?.map(x => ({ region: x.demarcation, value: x.average })) ?? [],
        [data]
    );

    // if (!data?.length) return null;

    const xAxisData = chartData?.map(item => item.region);
    const seriesData = chartData?.map(item => item.value);

    const options = {
        tooltip: {
            trigger: "axis",
            formatter: params => {
                const point = params[0];
                return `${point.name}: ${point.value}%`;
            },
        },
        xAxis: {
            type: "category",
            data: xAxisData,
            axisLabel: {
                fontSize: 8,
                color: "#000",
                interval: 0,
            },
            axisLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.3)" },
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
                fontSize: 12,
                formatter: "{value}%",
            },
            splitLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.1)" },
            },
        },
        grid: {
            left: "5%",
            right: "5%",
            top: "10%",
            bottom: "0%",
            containLabel: true,
        },
        series: [
            {
                data: seriesData,
                type: "bar",
                itemStyle: {
                    color: params => {
                        const colors = [
                            "#A5D8F3", // Barishal
                            "#B6F3D2", // Chittagong
                            "#F3E5A5", // Dhaka North
                            "#D6BDF3", // Dhaka South
                            "#F3B5B8", // Khulna
                            "#CFD6F3", // Rajshahi
                            "#C7E9F3", // Sylhet
                        ];
                        return colors[params.dataIndex % colors.length];
                    },
                },
                barWidth: "75%",
            },
        ],
    };

    const csvData = chartData?.map(item => ({
        Region: item.region,
        "Average Strike Rate": item.value + "%",
    }));

    return (
        <div className="p-2" id={id}>
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title={title}
                    cssId={id}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                />
                <ReactECharts option={options} style={{ height: "300px", width: "100%" }} />
            </div>
        </div>
    );
};

export default AverageStrikeRateByGeo;
