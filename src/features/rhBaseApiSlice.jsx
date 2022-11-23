import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "baseApi",
    tagTypes: ["RabbitHoles", "Solutions", "Images", "Projects"],
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8000/api",
        // prepareHeaders(headers) {
        //
        // return headers;
        // },
    }),
    endpoints: () => ({})
});
