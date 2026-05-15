import ReactECharts from "echarts-for-react";
import { useState } from "react";
import ChartHeader from "./ChartHeader";
import AttendanceExpand from "./ExpandChart/Attendance/AttendanceExpand";

const CHART_COLORS = {
    present: "#fdc112",
    absent: "#ffe9a5",
    leave: "#e8ddbc",
};

const toNumber = value => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const toPercent = (value, total) => {
    if (!total) return 0;
    return Math.round((100 * value) / total);
};

const normalizeGroup = ({ label, total, present, leave, absent }) => {
    const safeTotal = Math.max(0, toNumber(total));
    const safePresent = Math.max(0, toNumber(present));
    const safeLeave = Math.max(0, toNumber(leave));
    const fallbackAbsent = Math.max(0, safeTotal - (safePresent + safeLeave));
    const safeAbsent =
        absent === undefined || absent === null ? fallbackAbsent : Math.max(0, toNumber(absent));

    return {
        label,
        total: safeTotal,
        present: safePresent,
        absent: safeAbsent,
        leave: safeLeave,
        presentPercent: toPercent(safePresent, safeTotal),
        absentPercent: toPercent(safeAbsent, safeTotal),
        leavePercent: toPercent(safeLeave, safeTotal),
    };
};

const createBarOption = groups => {
    const maxRate = Math.max(
        100,
        ...groups.map(g => g.presentPercent + g.absentPercent + g.leavePercent)
    );
    return {
        tooltip: {
            trigger: "item",
            formatter: params => {
                return `${params.name}<br/>${params.marker}${params.seriesName}: <b>${params.data.count}</b> (${params.data.value}%)`;
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "10%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: groups.map(g => g.label),
            axisLabel: {
                fontSize: 10,
            },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: "{value}%",
                showMaxLabel: true,
            },
            max: maxRate,
            interval: maxRate > 0 ? Math.ceil(maxRate / 5) : 20,
        },
        series: [
            {
                name: "Present",
                type: "bar",
                stack: "total",
                data: groups.map(g => ({ value: g.presentPercent, count: g.present })),
                itemStyle: {
                    color: CHART_COLORS.present,
                },
            },
            {
                name: "Absent",
                type: "bar",
                stack: "total",
                data: groups.map(g => ({ value: g.absentPercent, count: g.absent })),
                itemStyle: {
                    color: CHART_COLORS.absent,
                },
            },
            {
                name: "Leave",
                type: "bar",
                stack: "total",
                data: groups.map(g => ({ value: g.leavePercent, count: g.leave })),
                itemStyle: {
                    color: CHART_COLORS.leave,
                },
            },
        ],
    };
};

const AttendanceChart = ({ data }) => {
    const {
        cmAttendance,
        cmLeave,
        cmAbsent,
        totalCM,
        msAbsent,
        msAttendance,
        msLeave,
        totalMS,
        tsaAttendance,
        tsaAbsent,
        tsaLeave,
        totalTSA,
    } = data;

    const attendanceGroups = [
        {
            label: "CM",
            total: totalCM,
            present: cmAttendance,
            absent: cmAbsent,
            leave: cmLeave,
        },
        {
            label: "MS",
            total: totalMS,
            present: msAttendance,
            absent: msAbsent,
            leave: msLeave,
        },
        {
            label: "TSA",
            total: totalTSA,
            present: tsaAttendance,
            absent: tsaAbsent,
            leave: tsaLeave,
        },
    ].map(normalizeGroup);

    const csvData = attendanceGroups.map(group => ({
        "Employee Level": group.label,
        Total: group.total,
        Present: group.present,
        Absent: group.absent,
        Leave: group.leave,
    }));

    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleRefresh = () => {};
    return (
        <>
            <AttendanceExpand isModalOpen={expandedChart} setExpandedChart={setExpandedChart} />

            <div className="bg-white rounded-lg shadow h-[285px]" id="attendanceChart">
                <ChartHeader
                    title="Attendance"
                    setExpandedChart={setExpandedChart}
                    setIsMinimized={setIsMinimized}
                    isMinimized={isMinimized}
                    cssId="attendanceChart"
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    visibleClose
                    visibleFullScreen
                    additionalActions={[
                        { label: "Refresh", onClick: handleRefresh },
                        {
                            label: "Filter",
                            onClick: () => {},
                        },
                    ]}
                />

                {!isMinimized && (
                    <div className="px-3 pt-0 pb-3">
                        <ReactECharts
                            option={createBarOption(attendanceGroups)}
                            style={{ height: "180px", width: "100%" }}
                        />

                        <div className="-mt-3">
                            <div className="flex flex-col gap-1 text-[9px] md:text-[11px]">
                                {attendanceGroups.map(group => (
                                    <div
                                        key={group.label}
                                        className="flex items-center justify-between border-b border-gray-50 pb-0.5 last:border-0"
                                    >
                                        <div className="w-12 font-bold text-gray-700">
                                            {group.label}
                                        </div>
                                        <div className="flex-1 grid grid-cols-4 gap-x-1 items-center ml-2">
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-400">Total:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.total}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className="w-2 h-2 rounded-sm"
                                                    style={{
                                                        backgroundColor: CHART_COLORS.present,
                                                    }}
                                                />
                                                <span className="text-gray-400">Present:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.present}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className="w-2 h-2 rounded-sm"
                                                    style={{
                                                        backgroundColor: CHART_COLORS.absent,
                                                    }}
                                                />
                                                <span className="text-gray-400">Absent:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.absent}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className="w-2 h-2 rounded-sm"
                                                    style={{
                                                        backgroundColor: CHART_COLORS.leave,
                                                    }}
                                                />
                                                <span className="text-gray-400">Leave:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.leave}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AttendanceChart;
