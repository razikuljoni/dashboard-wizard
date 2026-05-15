// import { Table } from 'antd';
// import ChartHeader from '../../ChartHeader';

// const MSStrikeRateByDate = ({ data }) => {
//     if (!data?.length) return null;
//     const rowStyle = { borderBottom: '1px solid #ddd' };

//     function normalizeData(data) {
//         // Group data by region
//         const groupedData = {};

//         data.forEach(entry => {
//             const { demarcation, day, average } = entry;

//             // Initialize the region if not already in groupedData
//             if (!groupedData[demarcation]) {
//                 groupedData[demarcation] = {
//                     Key: Object.keys(groupedData).length + 1, // Assign a unique key based on region count
//                     Region: demarcation, // Ensure the region field is added correctly
//                 };
//             }

//             // Add the average value for the corresponding day
//             groupedData[demarcation][day] = `${Math.round(average)}%`;
//         });

//         // Convert the grouped data to an array format
//         const formattedData = Object.values(groupedData);

//         // Calculate averages for each day
//         const averageData = {
//             Key: formattedData.length + 1,
//             Region: 'Average',
//         };
//         const dayKeys = new Set(data.map(entry => entry.day));

//         dayKeys.forEach(day => {
//             const dayValues = data
//                 .filter(entry => entry.day === day)
//                 .map(entry => entry.average);
//             const dayAverage = (
//                 dayValues.reduce((sum, val) => sum + val, 0) / dayValues.length
//             ).toFixed(2);
//             averageData[day] = `${Math.round(dayAverage)}%`;
//         });

//         // Add the average object as the last entry
//         formattedData.push(averageData);

//         return formattedData;
//     }

//     function generateColumns(data) {
//         // Extract unique days from the data
//         const uniqueDays = [...new Set(data.map(entry => entry.day))];

//         // Build columns dynamically
//         const columns = [{ title: '', dataIndex: 'Region', key: 'Region' }];

//         uniqueDays.forEach(day => {
//             columns.push({ title: day, dataIndex: day, key: day });
//         });

//         return columns;
//     }

//     // Normalize the data
//     const normalizedData = normalizeData(data);

//     // Generate dynamic columns
//     const columns = generateColumns(data);

//     return (
//         <div className="px-5 py-2" id="ms-strike-rate-by-day">
//             <div className="p-3 bg-white rounded-lg shadow">
//                 <ChartHeader
//                     title="MS Strike Rate By Day"
//                     cssId="ms-strike-rate-by-day"
//                     downloadOptions={['PNG', 'SVG', 'CSV']}
//                     csvData={normalizedData}
//                     extended
//                 />
//                 <Table
//                     dataSource={normalizedData}
//                     columns={columns}
//                     pagination={false}
//                     rowClassName={() => 'custom-row'}
//                     rowKey={record => record?.Key}
//                     size="small"
//                     bordered={false}
//                     scroll={{ x: '100%' }}
//                     components={{
//                         body: {
//                             row: props => (
//                                 <tr
//                                     {...props}
//                                     style={{ ...rowStyle, ...props.style }}
//                                 >
//                                     {props.children}
//                                 </tr>
//                             ),
//                         },
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default MSStrikeRateByDate;
