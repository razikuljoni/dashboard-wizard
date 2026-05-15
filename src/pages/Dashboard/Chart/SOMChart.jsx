import React from "react";
import ReactECharts from "echarts-for-react";

const SOMChart = () => {
    const chartOption = {
        // title: {
        //     text: 'Share of Market (SOM)',
        //     left: 'center',
        //     textStyle: {
        //         fontSize: 18,
        //         fontWeight: 'bold',
        //     },
        // },
        tooltip: {
            trigger: "item",
            formatter: params => {
                if (params.data && params.data.name !== "Flag") {
                    return `${params.name}: ${params.value}%`;
                }
                return ""; // No tooltip for the flag image node
            },
        },
        legend: {
            data: ["BATB", "JTI", "PMI", "AKTC"],
            bottom: 10,
            left: "bottom",
            textStyle: {
                fontSize: 12,
            },
        },
        series: [
            {
                type: "graph",
                layout: "none", // Set layout to 'none' to control exact positions of nodes
                roam: false,
                label: {
                    show: true,
                    position: "inside",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#ffffff",
                    formatter: params => {
                        if (params.data && params.data.value) {
                            return `${params.data.value}%`; // Show the value inside the circle
                        }
                        return "";
                    },
                },
                edgeLabel: {
                    show: false,
                },
                data: [
                    {
                        name: "Flag",
                        symbol: "image://https://m-lenz.sgp1.cdn.digitaloceanspaces.com/SM%20Map@7x.png",
                        symbolSize: 80,
                        itemStyle: {
                            color: "#3B7A57",
                        },
                        x: 0,
                        y: -200, // Positioned at the top center
                        label: {
                            show: false, // Disable label for the flag image
                        },
                    },
                    {
                        name: "BATB",
                        value: 78,
                        symbolSize: 80, // Adjust size based on value (e.g., larger for higher value)
                        itemStyle: {
                            color: "#FFAD43",
                        },
                        x: -10, // Positioned below and to the left
                        y: 50,
                    },
                    {
                        name: "JTI",
                        value: 13,
                        symbolSize: 50, // Adjust size based on value
                        itemStyle: {
                            color: "#5AC8C6",
                        },
                        x: 200, // Positioned below and to the right
                        y: 50,
                    },
                    {
                        name: "PMI",
                        value: 3,
                        symbolSize: 50, // Adjust size based on value
                        itemStyle: {
                            color: "#9B61F7",
                        },
                        x: -200, // Positioned below and far left (to avoid overlapping with BATB)
                        y: 50,
                    },
                    {
                        name: "AKTC",
                        value: 2,
                        symbolSize: 40, // Adjust size based on value
                        itemStyle: {
                            color: "#7C83FD",
                        },
                        x: 380, // Positioned below and far right
                        y: 50,
                    },
                ],
                links: [
                    { source: "Flag", target: "BATB" },
                    { source: "Flag", target: "JTI" },
                    { source: "Flag", target: "PMI" },
                    { source: "Flag", target: "AKTC" },
                ],
                lineStyle: {
                    color: "#A9A9A9",
                    width: 2,
                    curveness: 0.3,
                },
            },
        ],
    };

    const legendData = [
        { label: "BATB", color: "#FBBF24" },
        { label: "JTI", color: "#60A5FA" },
        { label: "PMI", color: "#8B5CF6" },
        { label: "AKTC", color: "#93C5FD" },
    ];

    return (
        <div className="bg-white shadow pb-3 pt-2 px-3 rounded-lg justify-center h-[273px]">
            <div className="">
                <h2 className="m-0 p-0 font-bold">SOM</h2>
            </div>
            {/* <ReactECharts
                option={chartOption}
                style={{
                    height: '200px',
                    width: '100%',
                }}
            /> */}
            {/* <div className="flex items-center justify-center space-x-4 pt-3">
                {legendData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className="w-4 h-4"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default SOMChart;
