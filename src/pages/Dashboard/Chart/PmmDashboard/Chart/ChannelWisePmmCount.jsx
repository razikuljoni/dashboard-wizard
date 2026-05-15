import ChartHeader from "@/pages/Dashboard/Chart/ChartHeader";
import { useState } from "react";

const ChannelWisePmmCount = ({ data }) => {
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = data?.map(item => ({
        "Channel Name": item.name,
        Count: item.count,
    }));

    return (
        <>
            <div className="bg-white shadow rounded-lg h-[285px]" id="campaign-wise-assign-cm">
                <ChartHeader
                    title="Channel Wise PMM Count"
                    setExpandedChart={setExpandedChart}
                    visibleExpandChart="No"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="campaign-wise-assign-cm"
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
                    visibleMinimize
                    visibleClose
                    additionalActions={[
                        { label: "Refresh" },
                        {
                            label: "Filter",
                            onClick: () => console.log("filtering chart"),
                        },
                    ]}
                />
                {!isMinimized && (
                    <>
                        <div className="flex items-center justify-center h-[85%] w-full">
                            <div className="flex justify-between p-6 w-full text-center">
                                <div className="flex-1">
                                    <h2 className="text-4xl font-bold text-gray-800">
                                        {data?.find(x => x.name === "TLP Channel")?.count || 0}
                                    </h2>
                                    <p className="mt-2 text-gray-500">TLP Channel</p>
                                </div>
                                <div className="mx-4 h-16 border-l border-gray-300"></div>
                                <div className="flex-1">
                                    <h2 className="text-4xl font-bold text-gray-800">
                                        {data?.find(x => x.name === "GT Channel")?.count || 0}
                                    </h2>
                                    <p className="mt-2 text-gray-500">GT Channel</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ChannelWisePmmCount;
