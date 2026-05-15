import db from "@/data/db.json";
import { Modal, Spin } from "antd";
import ExpandCommonHeader from "../ExpandHeader";
import SovBySurfaceByDate from "./SovBySurfaceByDate";
import SovCountByDate from "./SovCountByDate";
import SovCountGeo from "./SovCountGeo";
import SovSurfaceGeo from "./SovSurfaceGeo";

export default function SovAnalysis({ isModalOpen, setExpandedChart }) {
    const handleCancel = () => {
        setExpandedChart(false);
    };

    const isLoading = false;

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
                    title="SOV Analysis"
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
                            <SovCountGeo data={db?.sov_analysis?.sovCountByGeo} />
                            <SovCountByDate data={db?.sov_analysis?.sovCountByDay} />
                            <SovSurfaceGeo data={db?.sov_analysis?.sovByAreaByGeo} />
                            <SovBySurfaceByDate data={db?.sov_analysis?.sovBySurfaceAreaByDay} />
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
