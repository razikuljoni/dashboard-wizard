import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    // baseUrl: "http://localhost:3000/",
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const dynamicBaseQuery = async (args, api, extraOptions) => {
    // Determine the base URL dynamically
    let customBaseUrl = import.meta.env.VITE_API_URL; // Default

    if (typeof args === "string") {
        if (
            args.startsWith("/api/v1/dashboard") ||
            args.includes("/campaign/campaign-stats/") ||
            args.includes("/campaign/campaign-point-stats/")
        ) {
            customBaseUrl = import.meta.env.VITE_API_URL; // Special base URL
        }
    } else if (args?.url) {
        if (
            args.url.startsWith("/api/v1/dashboard") ||
            args.url.includes("/campaign/campaign-stats/") ||
            args.url.includes("/campaign/campaign-point-stats/")
        ) {
            customBaseUrl = import.meta.env.VITE_API_URL; // Special base URL
        }
    }

    // Create a new fetchBaseQuery with the custom base URL
    const customBaseQuery = fetchBaseQuery({
        baseUrl: customBaseUrl,
        prepareHeaders: async (headers, { getState }) => {
            const token = getState()?.auth?.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });

    return customBaseQuery(args, api, extraOptions);
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: dynamicBaseQuery,
    tagTypes: [],
    endpoints: () => ({}),
});
