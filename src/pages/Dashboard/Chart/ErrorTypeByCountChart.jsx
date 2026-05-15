import ReactECharts from "echarts-for-react";
import React, { useState } from "react";
import ChartHeader from "./ChartHeader";
import ErrorAnalysis from "./ExpandChart/ErrorAnalysis/ErrorAnalysis";

const ErrorTypeByCountChart = ({ data }) => {
    const totalExecution = data?.execQty || 0;
    const geoTagError = data?.withinRadius || 0;
    const aiError = data?.passed || 0;
    const lessthen3Min = data?.minDurationError || 0;
    const morethen10Min = data?.maxDurationError || 0;

    // percentage calculation
    function calculatePercentage(total, value) {
        return Math.round((100 * value) / total || 0);
    }

    const geoTagErrorPercent = calculatePercentage(totalExecution, geoTagError);
    const aiErrorPercent = calculatePercentage(totalExecution, aiError);
    const lessthen3MinPercent = calculatePercentage(totalExecution, lessthen3Min);
    const morethen10MinPercent = calculatePercentage(totalExecution, morethen10Min);

    const chartOption = {
        title: {
            // text: '51123\nTotal Visit',
            left: "center",
            top: "center",
            textStyle: {
                fontSize: 24,
                fontWeight: "bold",
                color: "#333333",
                lineHeight: 28,
            },
        },
        tooltip: {
            trigger: "item",
            formatter: "{a}: {c}%",
        },
        series: [
            {
                name: "Geo Tag Error",
                type: "gauge",
                radius: "90%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#7C83FD",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    show: false, // Remove detail from inside the gauge
                },
                data: [{ value: geoTagErrorPercent }],
            },
            {
                name: "AI Accuracy <85%",
                type: "gauge",
                radius: "70%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#FF6B6B",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    show: false, // Remove detail from inside the gauge
                },
                data: [{ value: aiErrorPercent }],
            },
            {
                name: "Less than 3 Min.",
                type: "gauge",
                radius: "50%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#eab308",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    show: false, // Remove detail from inside the gauge
                },
                data: [{ value: lessthen3MinPercent }],
            },
            {
                name: "More than 10 Min.",
                type: "gauge",
                radius: "30%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#FFE082",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    show: false, // Remove detail from inside the gauge
                },
                data: [{ value: morethen10MinPercent }],
            },
        ],
    };

    const handleRefresh = () => {};

    const [expandedChart, setExpandedChart] = React.useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = [
        {
            "Error Type": "Geo Tag Error",
            "Error Count": geoTagError,
        },
        {
            "Error Type": "AI Accuracy <85%",
            "Error Count": aiError,
        },
        {
            "Error Type": "Less than 3 Min.",
            "Error Count": lessthen3Min,
        },
        {
            "Error Type": "More than 10 Min.",
            "Error Count": morethen10Min,
        },
    ];

    return (
        <>
            <ErrorAnalysis isModalOpen={expandedChart} setExpandedChart={setExpandedChart} />
            <div className="bg-white shadow rounded-lg h-[285px]" id="errorTypeByCount">
                <ChartHeader
                    title="Error Type By Count"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="errorTypeByCount"
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
                        {/* Radial Chart */}
                        <div className="flex justify-center items-center px-3 pt-12 pb-2">
                            <ReactECharts
                                option={chartOption}
                                style={{ height: "168px", width: "168px" }}
                            />
                            {/* Custom Labels Outside the Chart */}
                            <div className="font-sans">
                                {/* Row 1 */}
                                <div className="flex items-center mb-2">
                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-[#7C83FD] mr-1"></div>
                                    <span className="text-[8px] md:text-[10px]">Geo Tag Error</span>
                                    <span className="ml-auto text-[8px] md:text-[10px]">
                                        : {geoTagError || 0}
                                    </span>
                                </div>

                                {/* Row 2 */}
                                <div className="flex items-center mb-2">
                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-[#FF6B6B] mr-1"></div>
                                    <span className="text-[8px] md:text-[10px]">
                                        AI Accuracy &lt; 85%
                                    </span>
                                    <span className="ml-auto text-[8px] md:text-[10px]]">
                                        : {aiError || 0}
                                    </span>
                                </div>

                                {/* Row 3 */}
                                <div className="flex items-center mb-2">
                                    <div className="mr-1 w-2 h-2 bg-yellow-500 md:w-3 md:h-3"></div>
                                    <span className="text-[8px] md:text-[10px]">
                                        Less than 3 Min.
                                    </span>
                                    <span className="ml-auto text-[8px] md:text-[10px]">
                                        : {lessthen3Min || 0}
                                    </span>
                                </div>

                                {/* Row 4 */}
                                <div className="flex items-center">
                                    <div className="mr-1 w-2 h-2 bg-yellow-200 md:w-3 md:h-3"></div>
                                    <span className="text-[8px] md:text-[10px]">
                                        More than 10 Min.
                                    </span>
                                    <span className="ml-auto text-[8px] md:text-[10px]">
                                        : {morethen10Min || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ErrorTypeByCountChart;
