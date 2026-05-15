import db from "@/data/db.json";
import { Col, Modal, Row, Spin } from "antd";
import ReactECharts from "echarts-for-react";
import { useState } from "react";
import ChartHeader from "../../ChartHeader";
import ExpandCommonHeader from "../ExpandHeader";

export default function ErrorAnalysis({ isModalOpen, setExpandedChart }) {
    const handleCancel = () => {
        setExpandedChart(false);
    };

    const [loading, setLoading] = useState(false);

    const getChartOption = (
        geoTagError,
        accThreshold80Err,
        lessThan3Mins,
        moreThan7Minutes,
        totalVisits
    ) => ({
        title: {
            // text: `${totalVisits}\nTotal Visit`,
            left: "center",
            top: "center",
            textStyle: {
                fontSize: 16,
                fontWeight: "bold",
                color: "#333333",
                lineHeight: 20,
            },
        },
        tooltip: {
            trigger: "item",
            formatter: "{a}: {c}%",
        },
        series: [
            {
                name: "Geo Tag Error",
                type: "gauge",
                radius: "90%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#7C83FD",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: {
                    show: false,
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{ value: ((geoTagError / totalVisits) * 100).toFixed(2) }],
            },
            {
                name: "AI Accuracy <85%",
                type: "gauge",
                radius: "70%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#FF6B6B",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                data: [
                    {
                        value: ((accThreshold80Err / totalVisits) * 100).toFixed(2),
                    },
                ],
            },
            {
                name: "Less than 3 Min.",
                type: "gauge",
                radius: "50%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#eab308",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{ value: ((lessThan3Mins / totalVisits) * 100).toFixed(2) }],
            },
            {
                name: "More than 7 Min.",
                type: "gauge",
                radius: "30%",
                center: ["50%", "50%"],
                startAngle: 90,
                endAngle: -270,
                progress: {
                    show: true,
                    roundCap: true,
                    itemStyle: {
                        color: "#FFE082",
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [[1, "#E0E0E0"]],
                    },
                },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                data: [
                    {
                        value: ((moreThan7Minutes / totalVisits) * 100).toFixed(2),
                    },
                ],
            },
        ],
    });

    const Legend = ({ items }) => {
        return (
            <div className="flex flex-wrap items-center space-x-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.label}</span>
                    </div>
                ))}
            </div>
        );
    };

    const legendItems = [
        { label: "Geo Tag Error", color: "#7C83FD" },
        { label: "AI Accuracy <85%", color: "#FF6B6B" },
        { label: "Less than 3 Min.", color: "#eab308" },
        { label: "More than 10 Min.", color: "#FFE082" },
    ];

    const csvData =
        db?.error_type_analysis?.data?.map(item => ({
            Demarcation: item.demarcation,
            "Geo Tag Error": item.geoTagError,
            "AI Accuracy <85%": item.accThreshold80Err,
            "Less than 3 Min.": item.lessThan3Mins,
            "More than 10 Min.": item.moreThan7Minutes,
            "Total Visits": item.totalVisits,
        })) || [];

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
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
                    title="Error Type Analysis"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5">
                    {loading ? (
                        <div className="flex justify-center items-center h-[500px]">
                            <Spin size="large"></Spin>
                        </div>
                    ) : (
                        <>
                            <div className="px-5 py-2" id="sov-by-count-by-geo-extended">
                                <div className="p-3 bg-white rounded-lg shadow">
                                    <ChartHeader
                                        title="Error Type Count By Geography"
                                        cssId="sov-by-count-by-geo-extended"
                                        downloadOptions={["PNG", "SVG", "CSV"]}
                                        csvData={csvData}
                                        extended
                                        legend={<Legend items={legendItems} />}
                                    />
                                    <Row gutter={[16, 16]}>
                                        {db?.error_type_analysis?.map(
                                            ({
                                                demarcation,
                                                geoTagError,
                                                accThreshold80Err,
                                                lessThan3Mins,
                                                moreThan10Mins,
                                                totalVisits,
                                            }) => (
                                                <Col
                                                    xs={24}
                                                    sm={12}
                                                    md={8}
                                                    lg={6}
                                                    xl={4}
                                                    key={demarcation}
                                                >
                                                    <div className="space-y-2 text-center">
                                                        <ReactECharts
                                                            option={getChartOption(
                                                                geoTagError,
                                                                accThreshold80Err,
                                                                lessThan3Mins,
                                                                moreThan10Mins,
                                                                totalVisits
                                                            )}
                                                            style={{
                                                                height: "200px",
                                                                width: "100%",
                                                            }}
                                                        />
                                                        <p className="p-0 m-0 text-sm font-semibold">
                                                            {demarcation}
                                                        </p>
                                                    </div>
                                                </Col>
                                            )
                                        )}
                                    </Row>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
