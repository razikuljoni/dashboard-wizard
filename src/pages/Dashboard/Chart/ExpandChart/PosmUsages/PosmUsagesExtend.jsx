import { Modal } from "antd";
import { useEffect, useState } from "react";
import ExpandCommonHeader from "../ExpandHeader";

import Chart from "react-google-charts";
import ChartHeader from "../../ChartHeader";

export default function PosmUsagesExtend({ isModalOpen, setExpandedChart, data, csvData }) {
    const [newData, setNewData] = useState([]);
    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        if (isModalOpen) {
            setChartKey(prevKey => prevKey + 1); // Update key to force remount
            setTimeout(() => {
                setNewData(data);
            }, 100);
        }
    }, [isModalOpen, data]);

    const handleCancel = () => {
        setExpandedChart(false);
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            styles={{
                content: { margin: 0, padding: 0 },
            }}
            centered
            width="80%"
        >
            <div className="p-3 bg-[#F6F6F6] rounded">
                <ExpandCommonHeader
                    // title="Blanks Usages Analysis"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5">
                    <div className="px-5 py-2" id="posm-usages-extended">
                        <div className="p-3 bg-white rounded-lg shadow">
                            <ChartHeader
                                title="POSM Usages Analysis"
                                cssId="posm-usages-extended"
                                downloadOptions={["PNG", "SVG", "CSV"]}
                                csvData={csvData}
                                extended
                            />
                            <>
                                <Chart
                                    key={chartKey} // Force remount of the chart
                                    width="100%"
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
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
