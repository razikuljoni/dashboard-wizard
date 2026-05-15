import db from "@/data/db.json";
import { Col, Modal, Row } from "antd";
import TrendLineChart from "../../TrendLineChart";
import ExpandCommonHeader from "../ExpandHeader";
import AverageStrikeRateByGeo from "./AverageStrikeRateByGeo";
import StrikeRateByDateTable from "./StrikeRateByDateTable";

export default function StrikeRateAnalysis({ isModalOpen, setExpandedChart }) {
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
                    title="Strike Rate Analysis"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5 px-5">
                    <TrendLineChart
                        data={db?.strike_rate_analysis?.cmStrikeAvgByDate}
                        title="CM Average Strike Rate By Date"
                        id="cm-average-strike-rate-by-date"
                        dataKey="average"
                        showPercentage={true}
                        color="#E362B0"
                    />
                    <TrendLineChart
                        data={db?.strike_rate_analysis?.msStrikeAvgByDate}
                        title="MS Average Strike Rate By Date"
                        id="ms-average-strike-rate-by-date"
                        dataKey="average"
                        showPercentage={true}
                        color="#5c67f7"
                    />
                    <TrendLineChart
                        data={db?.strike_rate_analysis?.tsaStrikeAvgByDate}
                        title="TSA Average Strike Rate By Date"
                        id="tsa-average-strike-rate-by-date"
                        dataKey="average"
                        showPercentage={true}
                        color="#7ea5b2"
                    />
                    <Row>
                        <Col md={24} lg={12} xxl={8}>
                            <AverageStrikeRateByGeo
                                data={db?.strike_rate_analysis?.cmAvgStrikeGeo}
                                title={`CM Average Strike Rate By Geography`}
                                id={`cm-average-strike-rate-by-geography`}
                            />
                        </Col>
                        <Col md={24} lg={12} xxl={8}>
                            <AverageStrikeRateByGeo
                                data={db?.strike_rate_analysis?.msAvgStrikeGeo}
                                title={`MS Average Strike Rate By Geography`}
                                id={`ms-average-strike-rate-by-geography`}
                            />
                        </Col>
                        <Col md={24} lg={12} xxl={8}>
                            <AverageStrikeRateByGeo
                                data={db?.strike_rate_analysis?.tsaAvgStrikeGeo}
                                title={`TSA Average Strike Rate By Geography`}
                                id={`tsa-average-strike-rate-by-geography`}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={24} md={12} lg={8}>
                            <StrikeRateByDateTable
                                data={db?.strike_rate_analysis?.cmStrikeByDate}
                                title={`CM Strike Rate By Day`}
                                id={`cm-strike-rate-by-day`}
                            />
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <StrikeRateByDateTable
                                data={db?.strike_rate_analysis?.msStrikeByDate}
                                title={`MS Strike Rate By Day`}
                                id={`ms-strike-rate-by-day`}
                            />
                        </Col>
                        <Col sm={24} md={12} lg={8}>
                            <StrikeRateByDateTable
                                data={db?.strike_rate_analysis?.tsaStrikeByDate}
                                title={`TSA Strike Rate By Day`}
                                id={`tsa-strike-rate-by-day`}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
}
