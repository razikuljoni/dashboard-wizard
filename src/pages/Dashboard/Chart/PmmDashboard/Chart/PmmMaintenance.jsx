import ChartHeader from "@/pages/Dashboard/Chart/ChartHeader";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

const PmmMaintenance = ({ data: posmLifyCycleData }) => {
    const colors = [
        "blue",
        "purple",
        "palevioletred",
        "orange",
        "green",
        "mediumpurple",
        "pink",
        "cyan",
        "lime",
        "blue",
        "purple",
        "palevioletred",
        "orange",
        "green",
        "mediumpurple",
        "pink",
        "cyan",
        "lime",
        "blue",
        "purple",
        "palevioletred",
        "orange",
        "green",
        "mediumpurple",
        "pink",
        "cyan",
        "lime",
        "blue",
        "purple",
        "palevioletred",
        "orange",
        "green",
        "mediumpurple",
        "pink",
        "cyan",
        "lime",
        "blue",
        "purple",
        "palevioletred",
        "orange",
        "green",
        "mediumpurple",
        "pink",
        "cyan",
        "lime",
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(
                posmLifyCycleData?.map((x, i) => ({
                    label: x.name,
                    assignedCm: x.Yes,
                    totalCm: x.total,
                    color: colors[i],
                })) || []
            );
        }, 0);
    }, [posmLifyCycleData?.length]);

    // Pagination Configuration
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // Display 6 items per page

    // Determine the data to display based on the current page
    const paginatedData = data?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

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

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const csvData = data?.map(item => ({
        "Campaign Name": item.label,
        "Assigned CM": item.assignedCm,
        "Total CM": item.totalCm,
    }));

    return (
        <>
            <div
                className="bg-white shadow rounded-lg h-[285px] relative"
                id="campaign-wise-assign-cm"
            >
                <ChartHeader
                    title="PMM Maintenance"
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
                        { label: "Refresh", onClick: handleRefresh },
                        {
                            label: "Filter",
                            onClick: () => console.log("filtering chart"),
                        },
                    ]}
                />
                {!isMinimized && (
                    <>
                        <div style={ProgressBarContainer}>
                            {paginatedData?.map((item, index) => (
                                <div key={item.label} style={BarWrapper}>
                                    <div style={LabelContainer}>
                                        <div style={Label}>{item.label}</div>
                                        <div style={Days}>{item.assignedCm}</div>
                                    </div>
                                    <div style={Bar}>
                                        <div
                                            style={InnerBar(
                                                (item.assignedCm / item.totalCm) * 100,
                                                item.color
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {data?.length > 0 ? (
                            <div style={PaginationContainer}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={data?.length}
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

export default PmmMaintenance;
