import { Col, Modal, Row, Spin } from "antd";
import { useState } from "react";
import ExpandCommonHeader from "../ExpandHeader";

import db from "@/data/db.json";
import PlanogramAccuracyAvg from "./PlanogramAccuracyAvg";
import PlanogramAccuracyAvgGeo from "./PlanogramAccuracyAvgGeo";
import PlanogramDetectedCountByGeo from "./PlanogramDetectedCountByGeo";
import PlanogramGhwGeo from "./PlanogramGhwGeo";
import PlanogramValidGeo from "./PlanogramValidGeo";

export default function PlanogramAiAnalysis({ isModalOpen, setExpandedChart }) {
    const handleCancel = () => {
        setExpandedChart(false);
    };

    const [isLoading, setLoading] = useState(false);

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
                    title="Planogram AI Accuracy Analysis"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[500px]">
                            <Spin size="large"></Spin>
                        </div>
                    ) : (
                        <>
                            <PlanogramAccuracyAvg
                                data={
                                    db?.planogram_ai_accuracy_analysis?.planogramAccuracyAvgByDate
                                }
                            />
                            <Row gutter={[5, 5]}>
                                <Col span={12}>
                                    <PlanogramAccuracyAvgGeo
                                        data={
                                            db?.planogram_ai_accuracy_analysis
                                                ?.planogramAccuracyAvgByGeo
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <PlanogramValidGeo
                                        data={
                                            db?.planogram_ai_accuracy_analysis
                                                ?.planogramValidSeqAvgByGeo
                                        }
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[5, 5]}>
                                <Col span={12}>
                                    <PlanogramGhwGeo
                                        data={
                                            db?.planogram_ai_accuracy_analysis?.planogramGHWAvgByGeo
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <PlanogramDetectedCountByGeo
                                        data={
                                            db?.planogram_ai_accuracy_analysis
                                                ?.planogramDetectedCountByGeo
                                        }
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
