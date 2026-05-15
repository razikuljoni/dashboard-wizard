import ReactECharts from "echarts-for-react";
import { useState } from "react";
import ChartHeader from "./ChartHeader";
import CampaignCoverageAnalysis from "./ExpandChart/CampaignCoverageAnalysis/CampaignCoverageAnalysis";

const CampaignCoverageChart = ({ data }) => {
    const coverPercentage = Math.round(
        (100 * data?.covered) / (data?.covered + data?.remaining) || 0
    );

    const chartOption = {
        series: [
            {
                type: "pie",
                radius: ["70%", "100%"], // Donut thickness for a similar look
                center: ["50%", "50%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    position: "center",
                    // formatter: '{value|94%}\n{desc|Out of 23473}',
                    formatter: `{value|${coverPercentage}%}\n{desc|Out of ${data?.covered + data?.remaining || 0}}`,
                    rich: {
                        value: {
                            fontSize: 28,
                            fontWeight: "bold",
                            color: "#333333",
                            align: "center",
                        },
                        desc: {
                            fontSize: 12,
                            color: "#666666",
                            align: "center",
                        },
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                data: [
                    {
                        value: data?.covered || 0,
                        name: "Covered",
                        itemStyle: { color: "#FFC107" },
                    },
                    {
                        value: data?.remaining || 0,
                        name: "Remaining",
                        itemStyle: { color: "#FFE082" },
                    },
                ],
            },
        ],
    };

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const total = data?.covered + data?.remaining || 0;
    const coveredPercentage = total ? (data?.covered / total) * 100 : 0;
    const remainingPercentage = total ? (data?.remaining / total) * 100 : 0;

    const csvData = [
        {
            "Campaign Type": "Covered",
            Covered: data?.covered || 0,
            Percentage: `${coveredPercentage.toFixed(2)}%`,
        },
        {
            "Campaign Type": "Remaining",
            Covered: data?.remaining || 0,
            Percentage: `${remainingPercentage.toFixed(2)}%`,
        },
        {
            "Campaign Type": "Total",
            Covered: total,
            Percentage: "100%",
        },
    ];

    return (
        <>
            <CampaignCoverageAnalysis
                isModalOpen={expandedChart}
                setExpandedChart={setExpandedChart}
            />
            <div className=" bg-white shadow rounded-lg h-[285px]" id="campaign-coverage-chart">
                <ChartHeader
                    title="Campaign Coverage"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="campaign-coverage-chart"
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
                        {/* Donut Chart */}
                        <div className="flex justify-center items-center px-3 pt-16 pb-6">
                            <div className="w-[11.8rem] h-32">
                                <ReactECharts
                                    option={chartOption}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </div>

                            {/* Legend Information */}
                            <div className="text-sm">
                                <p className="flex items-center mb-2 text-[9px] md:text-sm">
                                    <span className="w-2 h-2 md:w-3 md:h-3 inline-block bg-[#FFC107] mr-2"></span>
                                    Covered{" "}
                                    <span className="ml-2 font-bold">({data?.covered || 0})</span>
                                </p>
                                <p className="flex items-center text-[9px] md:text-sm">
                                    <span className="w-2 h-2 md:w-3 md:h-3 inline-block bg-[#FFE082] mr-2"></span>
                                    Remaining{" "}
                                    <span className="ml-2 font-bold">({data?.remaining || 0})</span>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CampaignCoverageChart;
