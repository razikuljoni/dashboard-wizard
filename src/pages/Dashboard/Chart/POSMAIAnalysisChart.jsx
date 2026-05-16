import ReactECharts from "echarts-for-react";
import { useState } from "react";
import ChartHeader from "./ChartHeader";
import PosmAiAnalysis from "./ExpandChart/PosmAIAnalysis/PosmAiAnalysis";

const POSMAIAnalysisChart = ({ accuracy, data }) => {
    const accuracyValue = Math.round(accuracy?.find(x => x._id === "POSM")?.avg || 0);
    const ghw = data?.posmGhwPercentage || 0;
    const vlaidSequence = data?.posmValidSeqPercentage || 0;

    const chartOption = {
        series: [
            {
                type: "gauge",
                startAngle: 90,
                endAngle: -270,
                radius: "100%",
                pointer: {
                    show: false,
                },
                progress: {
                    show: true,
                    width: 18, // Thickness of the gauge
                    roundCap: true, // Rounded start and end points
                    itemStyle: {
                        color: "#FFC107",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 18,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    valueAnimation: true,
                    formatter: "{value}%",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#333333", // Dark color for visibility
                    offsetCenter: [0, "-20%"], // Position above the middle text
                },
                data: [
                    {
                        value: accuracyValue,
                    },
                ],
            },
            // Additional series for the "POSM Accuracy" text
            {
                type: "gauge",
                startAngle: 90,
                endAngle: -270,
                radius: "100%",
                pointer: {
                    show: false,
                },
                progress: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        width: 0, // No visible axis line
                    },
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    valueAnimation: false,
                    formatter: "POSM\nAccuracy",
                    fontSize: 11,
                    lineHeight: 16,
                    color: "#333333", // Darker color to ensure visibility
                    offsetCenter: [0, "30%"], // Position below the percentage value
                },
                data: [
                    {
                        value: 0, // Dummy value to render the text
                    },
                ],
            },
        ],
    };

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = [
        {
            "POSM Avg. Type": "POSM Accuracy",
            Average: accuracyValue.toFixed(2) + "%",
        },
        {
            "POSM Avg. Type": "POSM GHW",
            Average: ghw.toFixed(2) + "%",
        },
        {
            "POSM Avg. Type": "POSM Valid Sequence",
            Average: vlaidSequence.toFixed(2) + "%",
        },
    ];

    return (
        <>
            <PosmAiAnalysis isModalOpen={expandedChart} setExpandedChart={setExpandedChart} />

            <div className="bg-white shadow rounded-lg h-[285px]" id="posm-ai-analysis">
                <ChartHeader
                    title="POSM AI Analysis (Avg.)"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="posm-ai-analysis"
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
                    visibleClose
                    visibleFullScreen
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
                        {/* Gauge Chart */}
                        <div className="flex justify-center items-center px-3 pt-12 pb-4 gap-4">
                            <div className="flex justify-center">
                                <ReactECharts
                                    option={chartOption}
                                    style={{ height: "130px", width: "130px" }}
                                />
                            </div>

                            {/* Additional Metrics */}
                            <div className="text-[9px] md:text-sm">
                                <ul className="space-y-1">
                                    <li className="flex items-center">
                                        <span className="mr-1">•</span>
                                        GHW <span className="ml-auto font-bold">: {ghw}%</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-1">•</span>
                                        Valid Sequence{" "}
                                        <span className="ml-auto font-bold">
                                            : {vlaidSequence}%
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default POSMAIAnalysisChart;
