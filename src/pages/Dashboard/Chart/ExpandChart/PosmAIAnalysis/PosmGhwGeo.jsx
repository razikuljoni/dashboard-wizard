// CM Present Day to Day Chart using ECharts
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import ChartHeader from "../../ChartHeader";

const PosmGhwGeo = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data?.map(x => ({ region: x.demarcation, value: x.accuracy })));
    }, [data?.length]);

    const regions = chartData?.map(item => item.region);
    const values = chartData?.map(item => item.value);

    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: params => {
                return `${params[0].name}: ${params[0].value}%`;
            },
        },
        xAxis: {
            type: "value",
            boundaryGap: false,
            axisLabel: {
                formatter: "{value}%",
                fontSize: 12,
                color: "#000",
            },
            splitLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.1)" },
            },
        },
        yAxis: {
            type: "category",

            data: regions,
            axisLabel: {
                fontSize: 12,
                color: "#000",
            },
            axisLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.3)" },
            },
        },
        grid: {
            left: "2%",
            right: "5%",
            top: "5%",
            bottom: "5%",
            containLabel: true, // Ensure chart fits well within the container
        },
        series: [
            {
                type: "bar",
                data: values,
                barWidth: "65%",
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
                    borderRadius: [5, 5, 5, 5], // Rounded corners for bars
                },
                label: {
                    show: false,
                    position: "insideRight",
                    formatter: "{c}%",
                    fontSize: 12,
                    color: "#000",
                },
            },
        ],
    };

    const csvData = chartData?.map(item => ({
        Demarcation: item.region,
        Average: item.value.toFixed(2) + "%",
    }));

    return (
        <div className="px-5 py-2" id="posm-ghw-average-by-geography">
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title="POSM GHW Average By Geography"
                    cssId="posm-ghw-average-by-geography"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                />
                <ReactECharts option={options} style={{ height: "300px", width: "100%" }} />
            </div>
        </div>
    );
};

export default PosmGhwGeo;
