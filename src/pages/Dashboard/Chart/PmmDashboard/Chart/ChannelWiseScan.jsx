import ChartHeader from "@/pages/Dashboard/Chart/ChartHeader";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const ChannelWiseScan = ({ data }) => {
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        const result = [["Channel Name", "Scanned", "Not Scanned"]];
        data.forEach(item => {
            // Push the required fields to the result array
            result.push([item.name, item.scanned, item.notScanned]);
        });
        setNewData(result);
    }, [data?.length]);

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = data?.reduce((acc, item) => {
        const { name, scanned, notScanned } = item;
        acc.push({
            "Channel Name": name,
            Scanned: scanned,
            "Not Scanned": notScanned,
        });
        return acc;
    }, []);

    return (
        <>
            <div className="bg-white shadow rounded-lg h-[285px]" id="posmUsages">
                <ChartHeader
                    title="Channel Wise Scan"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="posmUsages"
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
                    <div>
                        {newData.length > 1 ? (
                            <Chart
                                width="100%"
                                height="230px"
                                chartType="ColumnChart"
                                loader={<p>Loading...</p>}
                                data={newData}
                                options={{
                                    backgroundColor: {
                                        fill: "transparent",
                                    },
                                    displayAnnotations: true,
                                    hAxis: {
                                        textStyle: {
                                            color: "#000000",
                                            fontSize: 11,
                                            fontFamily: "Roboto",
                                        },
                                    },
                                    vAxis: {
                                        textStyle: {
                                            color: "#000",
                                            fontSize: 14,
                                            fontFamily: "Roboto",
                                        },
                                        baselineColor: "#FFC107",
                                        gridlineColor: "#FFC107",
                                    },
                                    isStacked: "percent",
                                    legend: { position: "bottom" },
                                    colors: ["#FFC107", "#FFE082"],
                                    tooltip: {
                                        showColorCode: true,
                                    },
                                    chartArea: {
                                        left: 10,
                                        top: 10,
                                        bottom: 60,
                                        right: 5,
                                        width: "100%",
                                    },
                                }}
                                rootProps={{ "data-testid": "1" }}
                            />
                        ) : (
                            <p style={{ padding: 10 }}>Loading...</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ChannelWiseScan;
