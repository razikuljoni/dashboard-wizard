// CM Present Day to Day Chart using ECharts
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import ChartHeader from "../../ChartHeader";

const PlanogramDetectedCountByGeo = ({ data }) => {
    if (!data?.length) return null;

    const [newData, setNewData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const result = [["", "Yes", "No"]];
            data?.forEach(item => {
                // Push the required fields to the result array
                result.push([
                    item.day,
                    item.planogramDetectedYesCount,
                    item.planogramDetectedNoCount,
                ]);
            });
            setNewData(result);
        }, 300);
    }, [data?.length]);

    const csvData = data?.reduce((acc, item) => {
        const { day, planogramDetectedNoCount, planogramDetectedYesCount } = item;
        acc.push({
            "": day,
            Yes: planogramDetectedYesCount,
            No: planogramDetectedNoCount,
        });
        return acc;
    }, []);

    return (
        <>
            <div className="px-5 py-2" id="blanks-detected-count-by-geography">
                <div className="p-3 bg-white rounded-lg shadow">
                    <ChartHeader
                        title="Blanks Detected Count By Geography"
                        cssId="blanks-detected-count-by-geography"
                        downloadOptions={["PNG", "SVG", "CSV"]}
                        csvData={csvData}
                        extended
                    />

                    <div>
                        {newData?.length > 1 ? (
                            <Chart
                                width="100%"
                                height="300px"
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
                                            fontSize: 12,
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
                                        left: 50,
                                        top: 5,
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
                </div>
            </div>
        </>
    );
};

export default PlanogramDetectedCountByGeo;
