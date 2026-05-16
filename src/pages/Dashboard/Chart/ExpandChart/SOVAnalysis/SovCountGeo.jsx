// CM Present Day to Day Chart using ECharts
import ReactECharts from "echarts-for-react";
import ChartHeader from "../../ChartHeader";

const Legend = ({ items }) => {
    return (
        <div className="flex flex-wrap items-center gap-4">
            {items.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                    <div className="size-4" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

const SovCountGeo = ({ data }) => {
    function formatCoverageData(data) {
        // Extract unique demarcations dynamically
        const regions = [...new Set(data?.map(({ demarcation }) => demarcation))];

        // Initialize the result object with regions, companies array, and company data
        const result = {
            regions,
            companies: [...new Set(data?.map(({ company }) => company))],
        };

        // Initialize each company with an array of zeros
        result?.companies?.forEach(company => {
            result[company] = Array(regions?.length)?.fill(0);
        });

        // Map demarcations to their corresponding region indices
        const regionIndexMap = regions?.reduce((acc, region, index) => {
            acc[region] = index;
            return acc;
        }, {});

        // Populate the result object based on input data
        data?.forEach(({ company, demarcation, coverage }) => {
            const regionIndex = regionIndexMap[demarcation];

            // Only process valid companies and regions
            if (regionIndex !== undefined && result[company]) {
                // Assign rounded coverage value to the correct position in the array
                result[company][regionIndex] = coverage;
            }
        });

        return result;
    }

    const formattedData = formatCoverageData(data);

    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: params => {
                return params.map(item => `${item.seriesName}: ${item.value}%`).join("<br>");
            },
        },
        legend: {
            show: false,
            data: formattedData?.companies,
            top: "-5px",
            right: "0",
        },
        xAxis: {
            max: 100,
            type: "value",
            axisLabel: {
                formatter: "{value}%",
                fontSize: 12,
                color: "#000",
            },
            splitLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.1)" },
            },
        },
        yAxis: {
            type: "category",
            data: formattedData?.regions,
            axisLabel: {
                fontSize: 12,
                color: "#000",
            },
            axisLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.3)" },
            },
        },
        grid: {
            left: "3%",
            right: "5%",
            top: "5%",
            bottom: "10%",
            containLabel: true,
        },
        series: [
            {
                name: "BATB",
                type: "bar",
                stack: "total",
                data: formattedData?.BATB,
                itemStyle: {
                    color: "#FFC107",
                },
                label: {
                    show: false,
                    position: "inside",
                    formatter: "{c}%",
                    color: "#000",
                    fontSize: 12,
                },
            },
            {
                name: "JTI",
                type: "bar",
                stack: "total",
                data: formattedData?.JTI,
                itemStyle: {
                    color: "#03A9F4",
                },
                label: {
                    show: false,
                    position: "inside",
                    formatter: "{c}%",
                    color: "#000",
                    fontSize: 12,
                },
            },
            {
                name: "PMI",
                type: "bar",
                stack: "total",
                data: formattedData?.PMI,
                itemStyle: {
                    color: "#673AB7",
                },
                label: {
                    show: false,
                    position: "inside",
                    formatter: "{c}%",
                    color: "#FFF",
                    fontSize: 12,
                },
            },
            {
                name: "AKTC",
                type: "bar",
                stack: "total",
                data: formattedData?.AKTC,
                itemStyle: {
                    color: "#00BCD4",
                },
                label: {
                    show: false,
                    position: "inside",
                    formatter: "{c}%",
                    color: "#000",
                    fontSize: 12,
                },
            },
        ],
    };

    const legendItems = [
        { label: "BATB", color: "#FFC107" },
        { label: "JTI", color: "#03A9F4" },
        { label: "PMI", color: "#673AB7" },
        { label: "AKTC", color: "#00BCD4" },
    ];

    const csvData = data?.reduce((acc, item) => {
        const { company, demarcation, coverage } = item;
        if (!acc.some(obj => obj.Demarcation === demarcation)) {
            acc.push({ Demarcation: demarcation });
        }
        const index = acc.findIndex(obj => obj.Demarcation === demarcation);
        acc[index][company] = coverage + "%";
        return acc;
    }, []);

    return (
        <div className="px-5 py-2" id="sov-by-count-by-geography">
            <div className="p-3 bg-white rounded-lg shadow">
                <ChartHeader
                    title="SOV by Count By Geography"
                    cssId="sov-by-count-by-geography"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    extended
                    legend={<Legend items={legendItems} />}
                />

                <ReactECharts option={options} style={{ height: "300px", width: "100%" }} />
            </div>
        </div>
    );
};

export default SovCountGeo;
