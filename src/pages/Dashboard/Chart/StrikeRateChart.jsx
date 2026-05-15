import ReactECharts from "echarts-for-react";
import { useState } from "react";
import ChartHeader from "./ChartHeader";
import StrikeRateAnalysis from "./ExpandChart/StrikeRateAnalysis/StrikeRateAnalysis";
import db from "@/data/db.json";

const ORDERED_LEVELS = ["CM", "MS", "TSA"];

const STRIKE_COLORS = {
    achievement: "#fdc112",
    remaining: "#fef08a",
};

const toNumber = value => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const toPercent = (value, total) => {
    if (!total) return 0;
    return Math.round((100 * value) / total);
};

const createBarOption = groups => {
    const maxRate = Math.max(100, ...groups.map(g => g.strikeRate));
    return {
        tooltip: {
            trigger: "item",
            formatter: params => {
                if (params.seriesName === "Achievement") {
                    return `${params.name}<br/>
                    ${params.marker}Achievement: <b>${params.data.count}</b><br/>
                    ${params.marker}Strike Rate: <b>${params.data.value}%</b>`;
                }
                return `${params.name}<br/>
                ${params.marker}Remaining: <b>${params.data.count}</b><br/>
                    ${params.marker}Remaining Strike Rate: <b>${params.data.value}%</b>`;
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
                name: "Achievement",
                type: "bar",
                stack: "total",
                data: groups.map(g => ({
                    value: g.target > 0 ? g.strikeRate : 0, // Hide bar if no target
                    count: g.achievement,
                })),
                itemStyle: {
                    color: STRIKE_COLORS.achievement,
                },
            },
            {
                name: "Remaining",
                type: "bar",
                stack: "total",
                data: groups.map(g => ({
                    value: g.target > 0 ? Math.max(0, 100 - g.strikeRate) : 0, // Hide bar if no target
                    count: g.remaining,
                })),
                itemStyle: {
                    color: STRIKE_COLORS.remaining,
                },
            },
        ],
    };
};

const StrikeRateChart = ({ data }) => {
    const recordMap = new Map((data || []).map(doc => [doc?._id, doc]));

    const strikeRateGroups = ORDERED_LEVELS.map(label => {
        const doc = recordMap.get(label) || {};
        const target = toNumber(doc.target);
        const achievement = toNumber(doc.completed);
        const remaining = Math.max(0, target - achievement);

        return {
            label,
            target,
            achievement,
            remaining,
            strikeRate: toPercent(achievement, target),
        };
    });

    const csvData = strikeRateGroups.map(group => ({
        "Employee Level": group.label,
        Target: group.target,
        Achievement: group.achievement,
        "Strike Rate": group.strikeRate,
        Remaining: group.remaining,
    }));

    const handleRefresh = () => {};
    const [expandedChart, setExpandedChart] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <>
            <StrikeRateAnalysis isModalOpen={expandedChart} setExpandedChart={setExpandedChart} />
            <div className="bg-white shadow rounded-lg h-[285px]" id="strike-rate-chart">
                <ChartHeader
                    title="Strike Rate"
                    setExpandedChart={setExpandedChart}
                    downloadOptions={["PNG", "SVG", "CSV"]}
                    csvData={csvData}
                    visibleClose
                    visibleFullScreen
                    cssId="strike-rate-chart"
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
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
                            option={createBarOption(strikeRateGroups)}
                            style={{ height: "180px", width: "100%" }}
                        />

                        {/* Summary Values */}
                        <div className="-mt-3">
                            <div className="flex flex-col gap-1 text-[9px] md:text-[11px] font-sans">
                                {strikeRateGroups.map(group => (
                                    <div
                                        key={`${group.label}-summary`}
                                        className="flex items-center justify-between border-b border-gray-50 pb-0.5 last:border-0"
                                    >
                                        <div className="w-12 font-bold text-gray-700">
                                            {group.label}
                                        </div>
                                        <div className="flex-1 grid grid-cols-3 gap-x-1 items-center ml-2">
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-400">Target:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.target}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className="w-2 h-2 rounded-sm"
                                                    style={{
                                                        backgroundColor: STRIKE_COLORS.achievement,
                                                    }}
                                                />
                                                <span className="text-gray-400">Achievement:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.achievement}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className="w-2 h-2 rounded-sm"
                                                    style={{
                                                        backgroundColor: STRIKE_COLORS.remaining,
                                                    }}
                                                />
                                                <span className="text-gray-400">Remaining:</span>
                                                <span className="font-semibold text-gray-700">
                                                    {group.remaining}
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

export default StrikeRateChart;
