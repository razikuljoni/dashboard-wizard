import { Empty, Spin } from "antd";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import ChartHeader from "./ChartHeader";
import BlanksUsagesExtend from "./ExpandChart/BlanksUsagesExtend/BlanksUsagesExtend";

const BlanksUsages = ({ data, loading }) => {
    const [newData, setNewData] = useState([]);
    useEffect(() => {
        if (loading || data === undefined) {
            return;
        }
        const result = [["POSM Name", "Used", "Remaining"]];
        if (data && data.length > 0) {
            data.forEach(item => {
                result.push([item.name, item.count, item.remaining]);
            });
        }
        setNewData(result);
    }, [data, loading]);

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = data?.reduce((acc, item) => {
        const { name, count, remaining } = item;
        acc.push({ "POSM Name": name, Used: count, Remaining: remaining });
        return acc;
    }, []);

    return (
        <>
            <BlanksUsagesExtend
                isModalOpen={expandedChart}
                setExpandedChart={setExpandedChart}
                data={newData?.length > 1 ? newData : []}
                csvData={csvData}
            />
            <div
                className="bg-white rounded-lg shadow"
                style={{ height: "285px" }}
                id="blanksUsages"
            >
                <ChartHeader
                    title="Blanks Usages"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="blanksUsages"
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
                    <div className="flex items-center justify-center" style={{ height: "230px" }}>
                        {loading || data === undefined ? (
                            <Spin />
                        ) : newData.length > 1 ? (
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
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No Blanks Usages"
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default BlanksUsages;
