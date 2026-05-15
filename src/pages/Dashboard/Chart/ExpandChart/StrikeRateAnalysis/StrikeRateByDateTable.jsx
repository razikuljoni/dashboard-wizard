import { Table } from "antd";
import ChartHeader from "../../ChartHeader";

const StrikeRateByDateTable = ({ data, title, id }) => {
    // if (!data?.length) return null;
    const rowStyle = { borderBottom: "1px solid #ddd" };

    function normalizeData(rawData) {
        if (!rawData || rawData.length === 0) return [];
        // Group data by region
        const groupedData = {};

        rawData?.forEach(entry => {
            const { demarcation, day, average } = entry;

            // Initialize the region if not already in groupedData
            if (!groupedData[demarcation]) {
                groupedData[demarcation] = {
                    Key: Object?.keys(groupedData).length + 1,
                    Region: demarcation,
                };
            }

            // Add the average value for the corresponding day
            groupedData[demarcation][day] = `${Math.round(average)}%`;
        });

        // Convert the grouped data to an array format
        const formattedData = Object.values(groupedData);

        // Calculate averages for each day
        const averageData = {
            Key: formattedData.length + 1,
            Region: "Average",
        };
        const dayKeys = new Set(rawData?.map(entry => entry.day));

        dayKeys.forEach(day => {
            const dayValues = rawData
                .filter(entry => entry.day === day)
                .map(entry => entry.average);
            const dayAverage = (
                dayValues?.reduce((sum, val) => sum + val, 0) / dayValues.length
            ).toFixed(2);
            averageData[day] = `${Math.round(dayAverage)}%`;
        });

        // Add the average object as the last entry
        formattedData.push(averageData);

        return formattedData;
    }

    function generateColumns(rawData) {
        if (!rawData || rawData.length === 0) return [];
        // Extract unique days from the data
        const uniqueDays = [...new Set(rawData?.map(entry => entry.day))];

        // Build columns dynamically
        const columns = [{ title: "", dataIndex: "Region", key: "Region" }];

        uniqueDays.forEach(day => {
            columns?.push({ title: day, dataIndex: day, key: day });
        });

        return columns;
    }

    // Normalize the data
    const normalizedData = normalizeData(data);

    // Generate dynamic columns
    const columns = generateColumns(data);

    return (
        <div className="p-2" id={id}>
            <div className="p-3 bg-white rounded-lg shadow min-h-[200px] flex flex-col">
                <ChartHeader
                    title={title}
                    cssId={id}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={normalizedData}
                    extended
                />

                <Table
                    dataSource={normalizedData}
                    columns={columns}
                    pagination={false}
                    rowClassName={() => "custom-row"}
                    rowKey={record => record?.Key}
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

export default StrikeRateByDateTable;
