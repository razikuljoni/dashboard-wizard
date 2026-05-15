import { combineReducers } from "@reduxjs/toolkit";

import { api } from "./api/apiSlice";
import dashboardWidgets from "./features/dashboard/dashboardWidgets";

export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,

    dashboardWidgets: dashboardWidgets,
});
