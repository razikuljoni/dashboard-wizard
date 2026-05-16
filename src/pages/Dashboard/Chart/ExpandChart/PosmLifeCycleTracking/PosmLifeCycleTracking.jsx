import { Modal } from "antd";
import ReactECharts from "echarts-for-react";
import { useRef, useState } from "react";
import ChartHeader from "../../ChartHeader";
import ExpandCommonHeader from "../ExpandHeader";

export default function PosmLifeCycleTracking({ isModalOpen, setExpandedChart, data }) {
    const [newData, setNewData] = useState([]);
    const chartKeyRef = useRef(0);

    const labels = newData?.map(item => item.label);
    const days = newData?.map(item => item.days);

    const handleModalOpen = (open) => {
        if (open) {
            chartKeyRef.current += 1;
            setNewData(data);
        }
    };

    const handleCancel = () => {
        setExpandedChart(false);
    };

    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: params => {
                return `${params[0].name}: ${params[0].value} Days`;
            },
        },
        xAxis: {
            type: "value",
            boundaryGap: false,
            axisLabel: {
                formatter: "{value} Days",
                fontSize: 12,
                color: "#000",
            },
            splitLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.1)" },
            },
        },
        yAxis: {
            type: "category",

            data: labels,
            axisLabel: {
                fontSize: 12,
                color: "#000",
            },
            axisLine: {
                lineStyle: { color: "rgba(0, 0, 0, 0.3)" },
            },
        },
        grid: {
            left: "2%",
            right: "5%",
            top: "5%",
            bottom: "5%",
            containLabel: true, // Ensure chart fits well within the container
        },
        series: [
            {
                type: "bar",
                data: days,
                barWidth: "65%",
                itemStyle: {
                    color: params => {
                        const colors = [
                            "#A5D8F3", // Barishal
                            "#B6F3D2", // Chittagong
                            "#F3E5A5", // Dhaka North
                            "#D6BDF3", // Dhaka South
                            "#F3B5B8", // Khulna
                            "#CFD6F3", // Rajshahi
                            "#C7E9F3", // Sylhet
                        ];
                        return colors[params.dataIndex % colors.length];
                    },
                    borderRadius: [5, 5, 5, 5], // Rounded corners for bars
                },
                label: {
                    show: false,
                    position: "insideRight",
                    formatter: "{c} Days",
                    fontSize: 12,
                    color: "#000",
                },
            },
        ],
    };

    // Create CSV data from labels and days
    const csvData = newData?.reduce((acc, item) => {
        const { label, days } = item;
        acc.push({ "POSM Type": label, Days: days ? days : 0 });
        return acc;
    }, []);

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            afterOpenChange={handleModalOpen}
            footer={null}
            closable={false}
            styles={{
                content: { margin: 0, padding: 0 },
            }}
            centered
            width="80%"
        >
            <div className="p-3 bg-[#F6F6F6] rounded">
                <ExpandCommonHeader
                    // title="POSM Lifecycle Tracking"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5">
                    <div className="px-5 py-2" id="posm-lifecycle-tracking-extended">
                        <div className="p-3 bg-white rounded-lg shadow">
                            <ChartHeader
                                title="POSM Lifecycle Tracking"
                                cssId="posm-lifecycle-tracking-extended"
                                downloadOptions={["PNG", "SVG", "CSV"]}
                                csvData={csvData}
                                extended
                            />
                            <>
                                <ReactECharts
                                    option={options}
                                    style={{ height: "300px", width: "100%" }}
                                />
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
