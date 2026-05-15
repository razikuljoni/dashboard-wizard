import db from "@/data/db.json";
import { Col, Modal, Row, Spin } from "antd";
import { useState } from "react";
import ExpandCommonHeader from "../ExpandHeader";
import CampaignCoverageByDate from "./CampaignCoverageByDate";
import CampaignCoverageByGeo from "./CampaignCoverageByGeo";
import CumalativeOutletCoverage from "./CumalativeOutletCoverage";
import GeoCoverage from "./GeoCoverage";

export default function CampaignCoverageAnalysis({ isModalOpen, setExpandedChart }) {
    const handleCancel = () => {
        setExpandedChart(false);
    };

    const [isLoading, setIsLoading] = useState(false);

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
                    title="Campaign Coverage Analysis"
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
                            <CampaignCoverageByDate
                                data={db?.campaign_coverage_analysis?.coverageByDate}
                            />
                            <CampaignCoverageByGeo
                                data={db?.campaign_coverage_analysis?.geoCoverageByDay}
                            />
                            <Row gutter={[5, 5]}>
                                <Col span={12}>
                                    <GeoCoverage
                                        data={db?.campaign_coverage_analysis?.coverageByGeo}
                                    />
                                </Col>
                                <Col span={12}>
                                    <CumalativeOutletCoverage
                                        data={
                                            db?.campaign_coverage_analysis?.cumulativeOutletCoverage
                                        }
                                    />
                                </Col>
                            </Row>
                            {/* <Row gutter={[5, 5]}>
                                <Col span={12}>
                                    <CMStrikeRateByDate
                                        data={data?.data?.cmStrikeByDate}
                                    />
                                </Col>
                                <Col span={12}>
                                    <MSStrikeRateByDate
                                        data={data?.data?.msStrikeByDate}
                                    />
                                </Col>
                            </Row> */}
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
