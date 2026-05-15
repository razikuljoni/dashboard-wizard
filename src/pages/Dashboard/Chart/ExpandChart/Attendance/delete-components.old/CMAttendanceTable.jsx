// import { Table } from 'antd';
// import ChartHeader from '../../ChartHeader';

// const CMAttendanceTable = ({ data }) => {
//     if (!data?.length) return null;
//     const rowStyle = { borderBottom: '1px solid #ddd' };

//     function formatAttendanceDataFromBackend(rawData) {
//         // Helper to format region name
//         const formatRegion = (demarcation, totalAttendees) =>
//             `${demarcation} (${totalAttendees})`;

//         // Group data by region and organize by day
//         const groupedData = {};
//         rawData.forEach(
//             ({ demarcation, day, presentAttendees, totalAttendees }) => {
//                 const region = formatRegion(demarcation, totalAttendees);
//                 if (!groupedData[region]) {
//                     const data = (groupedData[region] = {
//                         region,
//                         key: Object.keys(groupedData).length + 1,
//                     });
//                 }
//                 groupedData[region][day] = presentAttendees;
//             }
//         );

//         // Ensure all days are accounted for across regions
//         const uniqueDays = Array.from(
//             new Set(rawData.map(item => item.day))
//         ).sort();
//         const dataSource = Object.values(groupedData).map(entry => {
//             uniqueDays.forEach(day => {
//                 if (!entry[day]) {
//                     entry[day] = 0; // Default missing days to 0
//                 }
//             });
//             return entry;
//         });

//         // Add a total present row at the end
//         const totalPresent = {
//             key: (dataSource.length + 1).toString(),
//             region: 'Total Present',
//         };
//         uniqueDays.forEach(day => {
//             totalPresent[day] = rawData
//                 .filter(item => item.day === day)
//                 .reduce((sum, curr) => sum + curr.presentAttendees, 0);
//         });
//         dataSource.push(totalPresent);

//         return dataSource;
//     }

//     // Generate dynamic columns based on formatted data
//     function generateColumns(formattedData) {
//         const uniqueDays = Object.keys(formattedData[0]).filter(
//             key => key !== 'region' && key !== 'key'
//         );
//         const columns = [
//             { title: '', dataIndex: 'region', key: 'region' },
//             ...uniqueDays.map(day => ({
//                 title: day,
//                 dataIndex: day,
//                 key: day,
//             })),
//         ];
//         return columns;
//     }

//     // Transform data
//     const formattedData = formatAttendanceDataFromBackend(data);
//     const dynamicColumn = generateColumns(formattedData);

//     const csvData = formattedData.map(item => {
//         const newItem = { '': item?.region };
//         Object.keys(item).forEach(key => {
//             if (key !== 'key' && key !== 'region') {
//                 newItem[key] = item[key];
//             }
//         });
//         return newItem;
//     });

//     return (
//         <div className="px-5 py-2" id="cm-attendance-table">
//             <div className="p-3 bg-white rounded-lg shadow">
//                 <ChartHeader
//                     title="CM Attendance"
//                     cssId="cm-attendance-table"
//                     downloadOptions={['PNG', 'SVG', 'CSV']}
//                     csvData={csvData}
//                     extended
//                 />
//                 <Table
//                     dataSource={formattedData}
//                     columns={dynamicColumn}
//                     pagination={false}
//                     rowClassName={() => 'custom-row'}
//                     rowKey="key"
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

// export default CMAttendanceTable;
