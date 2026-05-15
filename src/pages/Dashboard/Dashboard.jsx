import db from "@/data/db.json";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import AttendanceChart from "./Chart/AttendanceChart";
import CampaignCompletionChart from "./Chart/CampaignCompletionChart";
import CampaignCoverageChart from "./Chart/CampaignCoverageChart";
import ErrorTypeByCountChart from "./Chart/ErrorTypeByCountChart";
import ChannelWisePmmCount from "./Chart/PmmDashboard/Chart/ChannelWisePmmCount";
import ChannelWiseScan from "./Chart/PmmDashboard/Chart/ChannelWiseScan";
import LocationStatus from "./Chart/PmmDashboard/Chart/LocationStatus";
import PmmMaintenance from "./Chart/PmmDashboard/Chart/PmmMaintenance";
import PmmMovementStatus from "./Chart/PmmDashboard/Chart/PmmMovementStatus";
import TotalPmmScan from "./Chart/PmmDashboard/Chart/TotalPmmScan";
import POSMAIAnalysisChart from "./Chart/POSMAIAnalysisChart";
import POSMLifeCycleTrackingChart from "./Chart/POSMLifeCycleTrackingChart";
import POSMUsageChart from "./Chart/POSMUsagesChart";
import SOVBubbleChart from "./Chart/SovChart";
import StrikeRateChart from "./Chart/StrikeRateChart";

const Dashboard = () => {
    const { dashboardWidgets } = useSelector(state => state.dashboardWidgets);

    const dataLoading = false;
    const isLoading = false;

    return (
        <div className="p-10 bg-slate-50">
            <Row gutter={[16, 16]}>
                {/* attendance chart */}
                {dashboardWidgets.find(x => x === "Attendance") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <AttendanceChart data={db?.primary_dashboard?.attendance || []} />
                    </Col>
                ) : null}

                {/* strike rate chart */}
                {dashboardWidgets.find(x => x === "Strike Rate") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <StrikeRateChart data={db?.primary_dashboard?.strike_rate} />
                    </Col>
                ) : null}

                {/* Pmm Dashboard Charts*/}
                {dashboardWidgets.find(x => x === "Channel Wise PMM Count") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <ChannelWisePmmCount data={db?.primary_dashboard?.channelWisePMMCount} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Total PMM Scan") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <TotalPmmScan data={db?.primary_dashboard?.totalPMMScan} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Channel Wise Scan") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <ChannelWiseScan data={db?.primary_dashboard?.channelWiseScan || []} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "PMM Movement Status") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <PmmMovementStatus data={db?.primary_dashboard?.pmmMovementStatus || []} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Location Status") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <LocationStatus data={db?.primary_dashboard?.locationStatus} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "PMM Maintenance") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <PmmMaintenance data={db?.primary_dashboard?.pmmMaintenance} />
                    </Col>
                ) : null}
                {/* Pmm charts end */}

                <>
                    {/* Campaign Coverage Chart */}
                    {dashboardWidgets.find(x => x === "Campaign Coverage") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <CampaignCoverageChart data={db?.primary_dashboard?.campaignAverage} />
                        </Col>
                    ) : null}

                    {/* POSM AI Analysis (Avg.) Chart */}
                    {dashboardWidgets.find(x => x === "POSM AI Analysis (Avg.)") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <POSMAIAnalysisChart
                                accuracy={db?.primary_dashboard?.accuracy || []}
                                data={db?.primary_dashboard?.GHWAndValidSeq || {}}
                            />
                        </Col>
                    ) : null}

                    {/* Campaign Completion By Day Chart */}
                    {dashboardWidgets.find(x => x === "Campaign Completion By Day") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <CampaignCompletionChart
                                data={db?.primary_dashboard?.campaignCompletionByDay || []}
                                remainingCampaignDay={
                                    db?.primary_dashboard?.remainingCampaignDay || 0
                                }
                                coverage={db?.primary_dashboard?.campaignAverage}
                                loading={dataLoading || isLoading}
                            />
                        </Col>
                    ) : null}

                    {/* POSM Usages Chart */}
                    {dashboardWidgets.find(x => x === "POSM Usages") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <POSMUsageChart
                                data={db?.primary_dashboard?.posmUsage || []}
                                loading={dataLoading || isLoading}
                            />
                        </Col>
                    ) : null}

                    {/* Error Type By Count Chart */}
                    {dashboardWidgets.find(x => x === "Error Type By Count") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <ErrorTypeByCountChart data={db?.primary_dashboard?.errors || []} />
                        </Col>
                    ) : null}

                    {/* SOV Chart */}
                    {dashboardWidgets.find(x => x === "SOV") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <SOVBubbleChart data={db?.primary_dashboard?.sov || []} />
                        </Col>
                    ) : null}

                    {/* POSM Life Cycle Tracking Chart */}
                    {dashboardWidgets.find(x => x === "POSM Life Cycle Tracking") ? (
                        <Col xs={24} sm={12} lg={8}>
                            <POSMLifeCycleTrackingChart
                                data={db?.primary_dashboard?.posmLife || []}
                                loading={dataLoading || isLoading}
                            />
                        </Col>
                    ) : null}
                </>
            </Row>
        </div>
    );
};

export default Dashboard;
