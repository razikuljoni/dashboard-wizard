import db from "@/data/db.json";
import { Col, Modal, Row } from "antd";
import ExpandCommonHeader from "../ExpandHeader";
import PosmAccuracyAvg from "./PosmAccuracyAvg";
import PosmAccuracyAvgGeo from "./PosmAccuracyAvgGeo";
import PosmDetectedCountByGeo from "./PosmDetectedCountByGeo";
import PosmGhwGeo from "./PosmGhwGeo";
import PosmValidGeo from "./PosmValidGeo";

export default function PosmAiAnalysis({ isModalOpen, setExpandedChart }) {
    const handleCancel = () => {
        setExpandedChart(false);
    };

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
                    title="POSM AI Accuracy Analysis"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5">
                    <PosmAccuracyAvg
                        data={db?.posm_ai_accuracy_analysis?.posmAccuracyAvgByDate}
                    />
                    <Row gutter={[5, 5]}>
                        <Col span={12}>
                            <PosmAccuracyAvgGeo
                                data={db?.posm_ai_accuracy_analysis?.posmAccuracyAvgByGeo}
                            />
                        </Col>
                        <Col span={12}>
                            <PosmValidGeo
                                data={db?.posm_ai_accuracy_analysis?.posmValidSeqAvgByGeo}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[5, 5]}>
                        <Col span={12}>
                            <PosmGhwGeo
                                data={db?.posm_ai_accuracy_analysis?.posmGHWAvgByGeo}
                            />
                        </Col>
                        <Col span={12}>
                            <PosmDetectedCountByGeo
                                data={db?.posm_ai_accuracy_analysis?.posmDetectedCountByGeo}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
}
