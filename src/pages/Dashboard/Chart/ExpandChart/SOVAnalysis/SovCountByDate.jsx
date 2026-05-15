import { Table } from "antd";
import ChartHeader from "../../ChartHeader";

const SovCountByDate = ({ data }) => {
    if (!data?.length) return null;
    const rowStyle = { borderBottom: "1px solid #ddd" };

    function normalizeData(data) {
        // Group data by region
        const groupedData = {};

        data.forEach(entry => {
            const { company, day, coverage } = entry;

            // Initialize the region if not already in groupedData
            if (!groupedData[company]) {
                groupedData[company] = {
                    key: Object.keys(groupedData).length + 1, // Assign a unique key based on region count
                    company: company, // Ensure the region field is added correctly
                };
            }

            // Add the average value for the corresponding day
            groupedData[company][day] = `${coverage}%`;
        });

        // Convert the grouped data to an array format
        const formattedData = Object.values(groupedData);

        return formattedData;
    }

    function generateColumns(data) {
        // Extract unique days from the data
        const uniqueDays = [...new Set(data.map(entry => entry.day))];

        // Build columns dynamically
        const columns = [{ title: "Owner", dataIndex: "company", key: "company" }];

        uniqueDays.forEach(day => {
            columns.push({ title: day, dataIndex: day, key: day });
        });

        return columns;
    }

    // Normalize the data
    const normalizedData = normalizeData(data);

    // Generate dynamic columns
    const columns = generateColumns(data);

    const csvData = data?.reduce((acc, item) => {
        const { company, day, coverage } = item;
        if (!acc.some(obj => obj.Date === day)) {
            acc.push({ Date: day });
        }
        const index = acc.findIndex(obj => obj.Date === day);
        acc[index][company] = coverage + "%";
        return acc;
    }, []);

    return (
        <div className="px-5 py-2" id="sov-count-by-date">
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title="SOV Count By Date"
                    cssId="sov-count-by-date"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                />
                <Table
                    dataSource={normalizedData}
                    columns={columns}
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

export default SovCountByDate;
