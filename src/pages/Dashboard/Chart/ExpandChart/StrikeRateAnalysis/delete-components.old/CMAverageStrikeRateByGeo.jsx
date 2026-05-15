// // CM Present Day to Day Chart using ECharts
// import ReactECharts from 'echarts-for-react';
// import { useEffect, useState } from 'react';
// import ChartHeader from '../../ChartHeader';

// const CMAverageStrikeRateByGeo = ({ data }) => {
//     const [chartData, setChartData] = useState([]);

//     useEffect(() => {
//         setChartData(
//             data?.map(x => ({ region: x.demarcation, value: x.average }))
//         );
//     }, [data?.length]);

//     const demoData = [
//         { date: '11 Nov', value: 1150 },
//         { date: '12 Nov', value: 1000 },
//         { date: '13 Nov', value: 1100 },
//         { date: '14 Nov', value: 500 },
//         { date: '15 Nov', value: 1120 },
//         { date: '16 Nov', value: 900 },
//         { date: '17 Nov', value: 200 },
//         { date: '18 Nov', value: 1200 },
//         { date: '19 Nov', value: 900 },
//         { date: '20 Nov', value: 1120 },
//         { date: '21 Nov', value: 100 },
//         { date: '22 Nov', value: 800 },
//     ];

//     const xAxisData = chartData?.map(item => item.region);
//     const seriesData = chartData?.map(item => item.value);

//     const options = {
//         tooltip: {
//             trigger: 'axis',
//             formatter: params => {
//                 const point = params[0];
//                 return `${point.name}: ${point.value}%`;
//             },
//         },
//         xAxis: {
//             type: 'category',
//             data: xAxisData,
//             axisLabel: {
//                 fontSize: 8,
//                 color: '#000',
//                 interval: 0, // Ensure all labels are shown
//                 // rotate: 45, // Rotate labels for better readability if necessary
//             },
//             axisLine: {
//                 lineStyle: { color: 'rgba(0, 0, 0, 0.3)' },
//             },
//         },
//         yAxis: {
//             type: 'value',
//             min: 0,
//             max: 100,
//             axisLabel: {
//                 fontSize: 12,
//                 formatter: '{value}%',
//             },
//             splitLine: {
//                 lineStyle: { color: 'rgba(0, 0, 0, 0.1)' },
//             },
//         },
//         grid: {
//             left: '5%',
//             right: '5%',
//             top: '10%',
//             bottom: '0%', // Increased bottom space for labels
//             containLabel: true, // Ensure chart fits well within the container
//         },
//         series: [
//             {
//                 data: seriesData,
//                 type: 'bar',
//                 itemStyle: {
//                     color: params => {
//                         const colors = [
//                             '#A5D8F3', // Barishal
//                             '#B6F3D2', // Chittagong
//                             '#F3E5A5', // Dhaka North
//                             '#D6BDF3', // Dhaka South
//                             '#F3B5B8', // Khulna
//                             '#CFD6F3', // Rajshahi
//                             '#C7E9F3', // Sylhet
//                         ];
//                         return colors[params.dataIndex % colors.length];
//                     },
//                 },
//                 barWidth: '75%',
//             },
//         ],
//     };

//     const csvData = chartData?.map(item => ({
//         Region: item.region,
//         'Average Strike Rate': item.value + '%',
//     }));

//     return (
//         <div className="px-5 py-2" id="cm-average-strike-rate-by-geography">
//             <div className="p-3 bg-white rounded-lg shadow">
//                 <ChartHeader
//                     title="CM Average Strike Rate By Geography"
//                     cssId="cm-average-strike-rate-by-geography"
//                     downloadOptions={['PNG', 'SVG', 'CSV']}
//                     csvData={csvData}
//                     extended
//                 />
//                 <ReactECharts
//                     option={options}
//                     style={{ height: '300px', width: '100%' }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CMAverageStrikeRateByGeo;
