import { Empty, Spin } from "antd";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import ChartHeader from "./ChartHeader";
import CampaignCompletionAnalysis from "./ExpandChart/CampaignCompletion/CampaignCompletionAnalysis";

const CampaignCompletionChart = ({ data, remainingCampaignDay, coverage = {}, loading }) => {
    const [chartDayData, setChartDayData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const total = coverage?.covered + coverage?.remaining || 0;

    useEffect(() => {
        // use timeout for component is mounted before the chart is rendered
        setTimeout(() => {
            setChartDayData(data?.map(x => x.day));
            setChartData(data?.map(x => x.covered));
        }, 0);
    }, [data?.length]);

    const estimatedEndDay = isNaN(+remainingCampaignDay) ? -1 : remainingCampaignDay - 1;

    const chartOption = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "line", // Show the line when hovering
                lineStyle: {
                    color: "#888888", // Color of the hover line
                    width: 1,
                    type: "solid",
                },
            },
            formatter: params => {
                let value = data[params[0].dataIndex]?.covered; // Get the actual data value
                let coveredToday = data[params[0].dataIndex]?.coveredThatDay; // Get the actual data value
                let date = dayjs(data[params[0].dataIndex]?.date).format("DD MMMM");

                return `Day: ${params[0].axisValue}<br/>Date: ${date} <br/>
                        Complete: ${coveredToday?.toLocaleString()} <br/>
                        Cumulative Coverage: ${value.toLocaleString()}`;
            },
        },
        grid: {
            left: "5%",
            right: "5%",
            bottom: "8%",
            top: "15%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: chartDayData,
            axisLine: {
                lineStyle: {
                    color: "#666666",
                },
            },
            axisLabel: {
                fontSize: 12,
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: "#E0E0E0",
                },
            },
            axisLabel: {
                fontSize: 12,
                formatter: value => `${(value * 100).toFixed(0)}%`, // Converts values to percentage
            },
            max: 1, // Set max value to 1 (100%)
            min: 0, // Set min value to 0 (0%)
            interval: 0.25, // Set interval to 0.25 (25%)
        },
        series: [
            {
                type: "line",
                smooth: true,
                data: chartData.map(value => value / Math.max(total)), // Normalize data, total = coverage(covered + remaining) 100%,
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "#FFD54F", // Top color
                            },
                            {
                                offset: 1,
                                color: "rgba(255, 213, 79, 0.1)", // Bottom color (transparent)
                            },
                        ],
                    },
                },
                lineStyle: {
                    color: "#FFC107",
                    width: 2,
                },
                symbol: "none",

                markLine: {
                    symbol: "none",
                    label: {
                        show: false,
                    },
                    silent: true,
                    data: [
                        {
                            xAxis: estimatedEndDay,
                            lineStyle: {
                                color: "#FF0000",
                                width: 1,
                                type: "solid",
                            },
                        },
                    ],
                },

                markPoint: {
                    symbol: "circle",
                    symbolSize: 5,
                    itemStyle: {
                        color: "#FF0000",
                    },
                    label: {
                        show: false,
                    },
                    data: [
                        {
                            coord: [
                                estimatedEndDay,
                                chartData[estimatedEndDay] / Math.max(...chartData),
                            ],
                        },
                    ],
                },
            },
        ],
    };

    const handleRefresh = () => {
        console.log("refreshing chart");
    };
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = chartDayData.map((day, index) => ({
        Day: day,
        Complete: chartData[index].toLocaleString(),
    }));

    return (
        <>
            <CampaignCompletionAnalysis
                isModalOpen={expandedChart}
                setExpandedChart={setExpandedChart}
            />
            <div className="bg-white shadow rounded-lg h-[285px]" id="campaign-completion-by-day">
                <ChartHeader
                    title="Campaign Completion By Day"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="campaign-completion-by-day"
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
                    visibleClose
                    visibleFullScreen={false}
                    additionalActions={[
                        { label: "Refresh", onClick: handleRefresh },
                        {
                            label: "Filter",
                            onClick: () => console.log("filtering chart"),
                        },
                    ]}
                />
                {!isMinimized && (
                    <>
                        <div className="w-full h-[215px] flex items-center justify-center">
                            {loading ? (
                                <Spin />
                            ) : chartData?.length > 0 ? (
                                <ReactECharts
                                    option={chartOption}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            ) : (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description="No Campaign Completion Data"
                                />
                            )}
                        </div>
                        <div className="pb-1 text-xs font-bold text-center md:text-sm">
                            Est. Campaign Period: {remainingCampaignDay || 0} Day
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CampaignCompletionChart;
