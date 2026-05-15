import { Empty, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import ChartHeader from "./ChartHeader";
import PosmLifeCycleTracking from "./ExpandChart/PosmLifeCycleTracking/PosmLifeCycleTracking";

const POSMLifeCycleTrackingChart = ({ data: posmLifyCycleData, loading }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(
                posmLifyCycleData?.map(x => ({
                    name: x.name,
                    value: x.posmLifeSpan,
                })) || []
            );
        }, 0);
    }, [posmLifyCycleData?.length]);

    const ProgressBarContainer = {
        width: "100%",
        padding: "0px 0.75rem 0.25rem 0.75rem",
        backgroundColor: "#fff",
        marginTop: "10px",
        position: "relative",
    };

    const BarWrapper = {
        marginBottom: "10px",
        position: "relative",
    };

    const LabelContainer = {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "3px",
    };

    const Label = {
        fontWeight: "400",
        fontSize: "11px",
    };

    const Bar = {
        height: "3px",
        backgroundColor: "#ddd",
        borderRadius: "5px",
        width: "100%",
        position: "relative",
    };

    const InnerBar = (percentage, color) => ({
        height: "100%",
        borderRadius: "5px",
        transition: "width 0.5s ease-in-out",
        backgroundColor: color,
        width: `${percentage}%`,
        position: "absolute",
        top: 0,
        left: 0,
    });

    const Days = {
        fontWeight: "400",
        fontSize: "11px",
    };

    const PaginationContainer = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%",
        position: "absolute",
        bottom: "10px",
        right: "10px",
    };

    const colors = [
        "blue",
        "purple",
        "palevioletred",
        "orange",
        "green",
        "mediumpurple",
        "pink",
        "red",
        "lime",
        "cyan",
        "magenta",
        "yellow",
        "black",
        "brown",
        "grey",
        "darkblue",
        "darkgreen",
        "darkred",
        "darkcyan",
        "darkmagenta",
        "darkyellow",
        "darkblack",
        "darkbrown",
        "darkgrey",
    ];

    const finalData = data?.map((x, idx) => ({
        label: x.name,
        days: x.value,
        color: colors[idx],
    }));

    // Pagination Configuration
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // Display 6 items per page

    // Determine the data to display based on the current page
    const paginatedData = finalData?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const maxValue = Math.max(...finalData.map(item => item.days)) + 0;

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = finalData?.map(({ label, days }) => ({
        Label: label,
        Days: days ? days : 0,
    }));

    return (
        <>
            <PosmLifeCycleTracking
                isModalOpen={expandedChart}
                setExpandedChart={setExpandedChart}
                data={finalData?.length ? finalData : []}
            />
            <div
                className="bg-white shadow rounded-lg h-[285px] relative"
                id="posm-life-cycle-tracking-chart"
            >
                <ChartHeader
                    title="POSM Life Cycle Tracking"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    cssId="posm-life-cycle-tracking-chart"
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
                        {loading ? (
                            <Spin className="flex items-center justify-center h-[230px]" />
                        ) : posmLifyCycleData?.length ? (
                            <div style={ProgressBarContainer}>
                                {paginatedData?.map((item, index) => (
                                    <div key={item.label} style={BarWrapper}>
                                        <div style={LabelContainer}>
                                            <div style={Label}>{item.label}</div>
                                            <div style={Days}>{item.days} Days</div>
                                        </div>
                                        <div style={Bar}>
                                            <div
                                                style={InnerBar(
                                                    (item.days / maxValue) * 100,
                                                    item.color
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No data found for POSM Life Cycle Tracking"
                            />
                        )}
                        {finalData?.length > 6 ? (
                            <div style={PaginationContainer}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={finalData?.length}
                                    onChange={handlePageChange}
                                    size="small"
                                />
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </>
    );
};

export default POSMLifeCycleTrackingChart;
