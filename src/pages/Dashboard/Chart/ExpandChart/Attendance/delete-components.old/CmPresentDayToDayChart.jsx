// // CM Present Day to Day Chart using ECharts
// import ReactECharts from 'echarts-for-react';
// import { useEffect, useState } from 'react';
// import ChartHeader from '../../ChartHeader';

// const CMPresentDayToDayChart = ({ data }) => {
//     const [chartData, setChartData] = useState([]);

//     useEffect(() => {
//         setChartData(
//             data?.map(x => ({ Date: x.day, Present: x.presentAttendees }))
//         );
//     }, [data?.length]);

//     const xAxisData = chartData?.map(item => item.Date);
//     const seriesData = chartData?.map(item => item.Present);

//     const options = {
//         tooltip: {
//             trigger: 'axis',
//             formatter: params => {
//                 const point = params[0];
//                 return `${point.name}: ${point.value}`;
//             },
//         },
//         xAxis: {
//             type: 'category',
//             data: xAxisData,
//             boundaryGap: false,
//             axisLabel: {
//                 fontSize: 12,
//                 color: 'rgba(0, 0, 0, 0.6)',
//             },
//             axisLine: {
//                 lineStyle: { color: 'rgba(0, 0, 0, 0.1)' },
//             },
//         },
//         yAxis: {
//             type: 'value',
//             axisLabel: {
//                 fontSize: 12,
//             },
//             splitLine: {
//                 lineStyle: { color: 'rgba(0, 0, 0, 0.05)' },
//             },
//         },
//         grid: {
//             left: '5%',
//             right: '5%',
//             top: '10%',
//             bottom: '10%',
//             // containLabel: true,
//         },
//         series: [
//             {
//                 data: seriesData,
//                 type: 'line',
//                 symbol: 'circle',
//                 symbolSize: 10,
//                 lineStyle: { width: 0 }, // Remove the connecting line
//                 itemStyle: {
//                     color: '#E362B0',
//                     borderColor: '#FFFFFF',
//                     borderWidth: 2, // Add white border around the dots
//                 },
//                 areaStyle: {
//                     color: {
//                         type: 'linear',
//                         x: 0,
//                         y: 0,
//                         x2: 0,
//                         y2: 1,
//                         colorStops: [
//                             { offset: 0, color: '#E362B0' }, // Top color
//                             { offset: 1, color: 'rgba(227, 98, 176, 0)' }, // Bottom transparent color
//                         ],
//                     },
//                 },
//             },
//         ],
//     };

//     return (
//         <div className="px-5 py-2" id="cm-present-day-to-day">
//             <div className="p-3 bg-white rounded-lg shadow">
//                 <ChartHeader
//                     title="CM Present Day to Day"
//                     cssId="cm-present-day-to-day"
//                     downloadOptions={['PNG', 'SVG', 'CSV']}
//                     csvData={chartData}
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

// export default CMPresentDayToDayChart;
