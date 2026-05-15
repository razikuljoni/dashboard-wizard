import { api } from "@/redux/api/apiSlice";

const complianceApi = api.injectEndpoints({
    endpoints: builder => ({
        getComplianceData: builder.mutation({
            query: data => ({
                url: `/api/v1/compliance`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetComplianceDataMutation } = complianceApi;
