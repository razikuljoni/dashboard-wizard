// CM Present Day to Day Chart using ECharts
import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import ChartHeader from "../../ChartHeader";

const CumalativeOutletCoverage = ({ data }) => {
    const [dates, setDates] = useState([]);
    const [values, setValues] = useState([]);
    const thresholdRef = useRef(0);

    useEffect(() => {
        setDates(data?.map(x => x.day));
        setValues(data?.map(x => x.coverage));
        thresholdRef.current = 0;
    }, [data?.length]);

    const options = {
        tooltip: {
            trigger: "axis",
            formatter: params => {
                return `${params[0].name}: ${params[0].value}`;
            },
        },
        xAxis: {
            type: "category",
            data: dates,
            axisLabel: {
                fontSize: 12,
                color: "#000",
            },
            axisLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.3)" },
            },
        },
        yAxis: {
            type: "value",
            boundaryGap: false,
            axisLabel: {
                fontSize: 12,
            },
            splitLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.1)" },
            },
        },
        grid: {
            left: "5%",
            right: "5%",
            top: "10%",
            bottom: "10%",
            containLabel: true, // Ensure chart fits well within the container
        },
        series: [
            {
                name: "Data",
                data: values,
                type: "line",
                lineStyle: {
                    color: "#1F78D1",
                    width: 2,
                },
                symbol: "none", // Ensure dots are removed
            },
            // {
            //     name: 'Threshold',
            //     data: new Array(values?.length)?.fill(threshold),
            //     type: 'line',
            //     lineStyle: {
            //         color: '#4CAF50',
            //         width: 2,
            //         type: 'line',
            //     },
            //     symbol: 'none', // Ensure dots are removed
            // },
        ],
    };

    const csvData = data?.map(x => ({
        Date: x.day,
        Coverage: x.coverage,
    }));

    return (
        <div className="px-5 py-2" id="cumulative-outlet-coverage">
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title="Cumulative Outlet Coverage"
                    cssId="cumulative-outlet-coverage"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                />
                <ReactECharts option={options} style={{ height: "300px", width: "100%" }} />
            </div>
        </div>
    );
};

export default CumalativeOutletCoverage;
