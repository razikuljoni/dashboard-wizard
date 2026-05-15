import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboardWidgets: [
        "Attendance",
        "Strike Rate",
        "Campaign Wise Assigned CM",
        "Campaign Coverage",
        "POSM AI Analysis (Avg.)",
        "Planogram AI Analysis (Avg.)",
        "Campaign Completion By Day",
        "POSM Usages",
        "Blanks Usages",
        "Error Type By Count",
        "SOV",
        "POSM Life Cycle Tracking",
        "Channel Wise PMM Count",
        "Total PMM Scan",
        "Channel Wise Scan",
        "Sub Channel Wise Scan",
        "PMM Movement Status",
        "Location Status",
        "PMM Maintenance",
    ],
};

const dashboardWidgets = createSlice({
    name: "dashboardWidgets",
    initialState,
    reducers: {
        setDashboardWidgets: (state, action) => {
            state.dashboardWidgets = action.payload;
        },
    },
});

export default dashboardWidgets.reducer;
export const { setDashboardWidgets } = dashboardWidgets.actions;
