import db from "@/data/db.json";
import { Modal } from "antd";
import { useState } from "react";
import TrendLineChart from "../../TrendLineChart";
import ExpandCommonHeader from "../ExpandHeader";
import AttendanceTable from "./AttendanceTable";

export default function AttendanceExpand({ isModalOpen, setExpandedChart }) {
    const handleCancel = () => {
        setExpandedChart(false);
    };

    const [loading, setLoading] = useState(false);

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
            <div className="p-3 px-5 bg-[#F6F6F6] rounded">
                <ExpandCommonHeader
                    title="Attendance Analysis"
                    onBack={handleCancel}
                    onClose={handleCancel}
                />
                <div className="mt-5">
                    {
                        <>
                            <TrendLineChart
                                data={db?.attendance_analysis?.cmPresDayToDay}
                                title="CM Present Day to Day"
                                id="cm-present-day-to-day"
                                dataKey="presentAttendees"
                                color="#E362B0"
                            />
                            <TrendLineChart
                                data={db?.attendance_analysis?.msPresDayToDay}
                                title="MS Present Day to Day"
                                id="ms-present-day-to-day"
                                dataKey="presentAttendees"
                                color="#5c67f7"
                            />
                            <TrendLineChart
                                data={db?.attendance_analysis?.tsaPresDayToDay}
                                title="TSA Present Day to Day"
                                id="tsa-present-day-to-day"
                                dataKey="presentAttendees"
                                color="#7ea5b2"
                            />

                            <AttendanceTable
                                data={db?.attendance_analysis?.cmAttend}
                                title="CM Attendance"
                                id="cm-attendance-table"
                            />
                            <AttendanceTable
                                data={db?.attendance_analysis?.msAttend}
                                title="MS Attendance"
                                id="ms-attendance-table"
                            />
                            <AttendanceTable
                                data={db?.attendance_analysis?.tsaAttend}
                                title="TSA Attendance"
                                id="tsa-attendance-table"
                            />
                        </>
                    }
                </div>
            </div>
        </Modal>
    );
}
