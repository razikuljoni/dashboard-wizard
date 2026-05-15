// CM Present Day to Day Chart using ECharts
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import ChartHeader from "../../ChartHeader";

const PosmAccuracyAvgGeo = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data?.map(x => ({ region: x.demarcation, value: x.accuracy })));
    }, [data?.length]);

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
                interval: 0, // Ensure all labels are shown
                // rotate: 45, // Rotate labels for better readability if necessary
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
            bottom: "0%", // Increased bottom space for labels
            containLabel: true, // Ensure chart fits well within the container
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
        Demarcation: item.region,
        Accuracy: item.value.toFixed(2) + "%",
    }));

    return (
        <div className="px-5 py-2" id="posm-accuracy-average-by-geography">
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title="POSM Accuracy Average By Geography"
                    cssId="posm-accuracy-average-by-geography"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                />
                <ReactECharts option={options} style={{ height: "300px", width: "100%" }} />
            </div>
        </div>
    );
};

export default PosmAccuracyAvgGeo;
