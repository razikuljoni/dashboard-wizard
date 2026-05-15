import { Table } from "antd";
import ChartHeader from "../../ChartHeader";

const CampaignCoverageByGeo = ({ data }) => {
    if (!data?.length) return null;
    const rowStyle = { borderBottom: "1px solid #ddd" };

    function formatAttendanceDataFromBackend(rawData) {
        // Helper to format region name
        const formatRegion = (demarcation, scope) => `${demarcation} (${scope})`;

        // Group data by region and organize by day
        const groupedData = {};
        rawData.forEach(({ demarcation, day, coverage, scope }) => {
            const region = formatRegion(demarcation, scope);
            if (!groupedData[region]) {
                groupedData[region] = {
                    region,
                    key: Object.keys(groupedData).length + 1,
                };
            }
            groupedData[region][day] = coverage;
        });

        // Ensure all days are accounted for across regions
        const uniqueDays = Array.from(new Set(rawData.map(item => item.day))).sort();
        const dataSource = Object.values(groupedData).map(entry => {
            uniqueDays.forEach(day => {
                if (!entry[day]) {
                    entry[day] = 0; // Default missing days to 0
                }
            });
            return entry;
        });

        // Add a total present row at the end
        const totalCovered = {
            key: (dataSource.length + 1).toString(),
            region: "Total Completed",
        };
        uniqueDays.forEach(day => {
            totalCovered[day] = rawData
                .filter(item => item.day === day)
                .reduce((sum, curr) => sum + curr.coverage, 0);
        });
        dataSource.push(totalCovered);

        return dataSource;
    }

    // Generate dynamic columns based on formatted data
    function generateColumns(formattedData) {
        const uniqueDays = Object.keys(formattedData[0]).filter(
            key => key !== "region" && key !== "key"
        );
        const columns = [
            { title: "", dataIndex: "region", key: "region" },
            ...uniqueDays.map(day => ({
                title: day,
                dataIndex: day,
                key: day,
            })),
        ];
        return columns;
    }

    // Transform data
    const formattedData = formatAttendanceDataFromBackend(data);
    const dynamicColumn = generateColumns(formattedData);

    const csvData = formattedData.map(item => {
        const newItem = { "": item?.region };
        Object.keys(item).forEach(key => {
            if (key !== "key" && key !== "region") {
                newItem[key] = item[key];
            }
        });
        return newItem;
    });

    return (
        <div className="px-5 py-2" id="geography-wise-campaign-completion-by-date">
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title="Geography Wise Campaign Completion By Date"
                    cssId="geography-wise-campaign-completion-by-date"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                />
                <Table
                    dataSource={formattedData}
                    columns={dynamicColumn}
                    pagination={false}
                    rowClassName={() => "custom-row"}
                    rowKey="key"
                    size="small"
                    bordered={false}
                    scroll={{ x: "100%" }}
                    components={{
                        body: {
                            row: props => (
                                <tr {...props} style={{ ...rowStyle, ...props.style }}>
                                    {props.children}
                                </tr>
                            ),
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default CampaignCoverageByGeo;
