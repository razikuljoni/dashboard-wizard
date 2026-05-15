import withErrorBoundary from "@/components/Shared/ErrorBoundaryHOC";
import useDownloadReport from "@/hooks/useDownloadReport";
import AttendanceChart from "@/pages/Dashboard/Chart/AttendanceChart";
import CampaignWiseAssignCm from "@/pages/Dashboard/Chart/CampaignWiseAssignCm";
import StrikeRateChart from "@/pages/Dashboard/Chart/StrikeRateChart";
import { Col, Row } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelWisePmmCount from "./Chart/ChannelWisePmmCount";
import ChannelWiseScan from "./Chart/ChannelWiseScan";
import LocationStatus from "./Chart/LocationStatus";
import PmmMaintenance from "./Chart/PmmMaintenance";
import PmmMovementStatus from "./Chart/PmmMovementStatus";
import SubChannelWiseScan from "./Chart/SubChannelWiseScan";
import TotalPmmScan from "./Chart/TotalPmmScan";

const PmmDashboardCharts = withErrorBoundary(({ data }) => {
    const [dataLoading, setDataLoading] = useState(false);

    // Report download hook calling
    const { downloadFile, downLoading, downError, downSuccess } = useDownloadReport();

    const [filters, setFilters] = useState({
        selectedCampaign: "67c4a2c19ec049d2437500ab",
        campaignType: "PMM",
    });

    // const [getDashboardData, { data, isLoading }] =
    //     useGetDashboardDataMutation();

    const { dashboardWidgets } = useSelector(state => state.dashboardWidgets);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     getDashboardData({
    //         campaignType: 'PMM',
    //         selectedCampaign: '67c4a2c19ec049d2437500ab',
    //     });
    // }, []);

    // const getData = async filtersData => {
    //     setDataLoading(true);
    //     try {
    //         await getDashboardData({
    //             campaignType: 'PMM',
    //             selectedCampaign: '67c4a2c19ec049d2437500ab',
    //             ...filtersData,
    //         }).unwrap();
    //     } catch (error) {
    //         message.error('Something went wrong');
    //     } finally {
    //         setDataLoading(false);
    //     }
    // };

    const Attendance = withErrorBoundary(AttendanceChart);
    const StrikeRate = withErrorBoundary(StrikeRateChart);
    const CampaignWiseCM = withErrorBoundary(CampaignWiseAssignCm);
    const TotalPmmScaned = withErrorBoundary(TotalPmmScan);
    const ChannelWisePmm = withErrorBoundary(ChannelWisePmmCount);
    const ChannelWiseScaned = withErrorBoundary(ChannelWiseScan);
    const LocationCount = withErrorBoundary(LocationStatus);
    // const PmmMaintenance = withErrorBoundary(PmmMaintenance);
    const PmmMovement = withErrorBoundary(PmmMovementStatus);
    const SubChannelWiseScaned = withErrorBoundary(SubChannelWiseScan);

    const download = data => {
        const body = {
            usercode: data?.employeeCode,
            ...data,
        };

        // TODO: need to add proper fields of filters
        downloadFile({
            url: `/v1/report/pmm-dashboard`,
            body,
            fileName: "PMM Dashboard.xlsx",
        });
    };

    return (
        <div className="bg-gray-100">
            {/* <div>
                <Filter
                    pathname="/pmm-management/pmm-monitoring"
                    pageName={'PMMDashboard'}
                    queryFunc={getData}
                    buttonLabel={'Search'}
                    loading={isLoading}
                    filters={filters}
                    setFilters={setFilters}
                    downloadFunc={download}
                    downloadLoading={downLoading}
                />
            </div> */}
            <Row gutter={[16, 16]}>
                {/* <Col xs={24} sm={12} lg={8}>
                    <Attendance data={data?.data?.attendance || []} />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <StrikeRate data={data?.data?.strike_rate} />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <CampaignWiseAssignCm
                        data={data?.data?.campaignWiseAssignedCM}
                    />
                </Col> */}

                {/* Pmm Dashboard Charts*/}
                {dashboardWidgets.find(x => x === "Channel Wise PMM Count") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <ChannelWisePmm data={data?.data?.channelWisePMMCount} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Total PMM Scan") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <TotalPmmScaned data={data?.data?.totalPMMScan} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Channel Wise Scan") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <ChannelWiseScaned data={data?.data?.channelWiseScan || []} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Sub Channel Wise Scan") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <SubChannelWiseScaned data={data?.data?.subChannelWiseScan || []} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "PMM Movement Status") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <PmmMovement data={data?.data?.pmmMovementStatus || []} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "Location Status") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <LocationCount data={data?.data?.locationStatus} />
                    </Col>
                ) : null}

                {dashboardWidgets.find(x => x === "PMM Maintenance") ? (
                    <Col xs={24} sm={12} lg={8}>
                        <PmmMaintenance data={data?.data?.pmmMaintenance} />
                    </Col>
                ) : null}
            </Row>
        </div>
    );
});

export default PmmDashboardCharts;
