import ChartHeader from "@/pages/Dashboard/Chart/ChartHeader";
import ReactECharts from "echarts-for-react";
import { useState } from "react";

const PmmMovementStatus = ({ data }) => {
    const coverPercentage = Math.round((100 * data?.moved) / (data?.moved + data?.notMoved) || 0);

    const total = data?.scanned || 0;

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
                    formatter: `{value|${total}}\n{desc|Scanned}`,
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
                        value: data?.moved || 0,
                        name: "Moved",
                        itemStyle: { color: "#FFC107" },
                    },
                    {
                        value: data?.notMoved || 0,
                        name: "Not Moved",
                        itemStyle: { color: "#FFE082" },
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
            Moved: data?.moved,
            "Not Moved": data?.notMoved,
            Scanned: data?.scanned,
        },
    ];

    return (
        <>
            <div className=" bg-white shadow rounded-lg h-[285px]" id="totalPmmScan">
                <ChartHeader
                    title="PMM Movement Status"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="totalPmmScan"
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
                    visibleMinimize
                    visibleClose
                    // visibleFullScreen
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
                                <p className="flex items-center mb-2 text-[10px]">
                                    <span className="w-1 h-1 md:w-2 md:h-2 inline-block bg-[#FFC107] mr-2"></span>
                                    Moved{" "}
                                    <span className="ml-2 font-bold">({data?.moved || 0})</span>
                                </p>
                                <p className="flex items-center text-[10px] ">
                                    <span className="w-1 h-1 md:w-2 md:h-2 inline-block bg-[#FFE082] mr-2"></span>
                                    Not Moved{" "}
                                    <span className="ml-2 font-bold">({data?.notMoved || 0})</span>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default PmmMovementStatus;
