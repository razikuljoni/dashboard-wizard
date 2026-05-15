import { useState } from "react";
import ChartHeader from "./ChartHeader";
import SovAnalysis from "./ExpandChart/SOVAnalysis/SovAnalysis";

const OverlappingBubbles = ({ data }) => {
    const getAverage = (category, company) =>
        data.find(item => item._id.category === category && item._id.company === company)?.avg || 0;

    const batSurfaceAreaAvg = getAverage("SOV By Surface", "BATB");
    const jtiSurfaceAreaAvg = getAverage("SOV By Surface", "JTI");
    const pmiSurfaceAreaAvg = getAverage("SOV By Surface", "PMI");
    const aktcSurfaceAreaAvg = getAverage("SOV By Surface", "AKTC");

    const batCountAvg = getAverage("SOV By Count", "BATB");
    const jtiCountAvg = getAverage("SOV By Count", "JTI");
    const pmiCountAvg = getAverage("SOV By Count", "PMI");
    const aktcCountAvg = getAverage("SOV By Count", "AKTC");

    const legendData = [
        { label: "BATB", color: "#FBBF24" },
        { label: "JTI", color: "#60A5FA" },
        { label: "PMI", color: "#8B5CF6" },
        { label: "AKTC", color: "#93C5FD" },
    ];
    const handleRefresh = () => {};

    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = [
        {
            "SOV Type": "SOV By Surface Area",
            BATB: batSurfaceAreaAvg.toFixed(2) + "%",
            JTI: jtiSurfaceAreaAvg.toFixed(2) + "%",
            PMI: pmiSurfaceAreaAvg.toFixed(2) + "%",
            AKTC: aktcSurfaceAreaAvg.toFixed(2) + "%",
        },
        {
            "SOV Type": "SOV By Count",
            BATB: batCountAvg.toFixed(2) + "%",
            JTI: jtiCountAvg.toFixed(2) + "%",
            PMI: pmiCountAvg.toFixed(2) + "%",
            AKTC: aktcCountAvg.toFixed(2) + "%",
        },
    ];

    return (
        <>
            <SovAnalysis isModalOpen={expandedChart} setExpandedChart={setExpandedChart} />
            <div
                className="bg-white shadow rounded-lg justify-center pb-2 h-[285px]"
                id="sov-analysis"
            >
                <ChartHeader
                    title="SOV"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="sov-analysis"
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
                <div>
                    {!isMinimized && (
                        <>
                            <div className="flex justify-center pt-5">
                                <div className="relative w-40 h-40">
                                    <div className="flex justify-center items-center">
                                        <div className="flex h-32 w-32 items-center justify-center pl-10 rounded-full bg-[#FBBF24] text-gray-700 ml-4">
                                            {Math.round(batSurfaceAreaAvg || 0)}%
                                        </div>
                                        <div className="absolute left-[26px] top-1 flex h-14 w-14 items-start justify-center pt-2 rounded-full border border-white bg-[#8B5CF6] text-white">
                                            {Math.round(pmiSurfaceAreaAvg || 0)}%
                                        </div>
                                        <div className="absolute left-[5px] top-10 z-10 flex h-[75px] w-[75px] items-center justify-center rounded-full border border-white bg-[#60A5FA] text-white">
                                            {Math.round(jtiSurfaceAreaAvg || 0)}%
                                        </div>
                                        <div className="absolute left-8 top-[6.2rem] flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#93C5FD] text-white">
                                            {Math.round(aktcSurfaceAreaAvg || 0)}%
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <p>SOV By Surface Area</p>
                                    </div>
                                </div>

                                <div className="relative w-40 h-40">
                                    <div className="flex justify-center items-center">
                                        <div className="flex h-32 w-32 items-center justify-start pl-8 rounded-full bg-[#FBBF24] text-gray-700 mr-4">
                                            {Math.round(batCountAvg || 0)}%
                                        </div>
                                        <div className="absolute right-[26px] top-1 flex h-14 w-14 items-start pt-2 justify-center rounded-full border border-white bg-[#8B5CF6] text-white">
                                            {Math.round(pmiCountAvg || 0)}%
                                        </div>
                                        <div className="absolute right-[5px] top-10 z-10 flex h-[75px] w-[75px] items-center justify-center rounded-full border border-white bg-[#60A5FA] text-white">
                                            {Math.round(jtiCountAvg || 0)}%
                                        </div>
                                        <div className="absolute right-8 top-[6.2rem] flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#93C5FD] text-white">
                                            {Math.round(aktcCountAvg || 0)}%
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <p>SOV By Count</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center space-x-4 pt-[18px] mt-5">
                                {legendData.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div
                                            className="w-4 h-4"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        ></div>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OverlappingBubbles;
