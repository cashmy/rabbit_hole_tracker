import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSolutionSlice = createApi({
    reducerPath: "apiSolution",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/solutions",
        // prepareHeaders(headers) {
        //     // const token = localStorage.getItem("token");
        //     // headers.localStorage("authorization", `Bearer ${token}`);
        //     // headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
        //     headers.set("Content-Type", "multipart/form-data");
            // console.log([...headers]);
        //     return headers;
        // },
    }),
    tagTypes: ["Solution"],
    refetchOnFocus: true,

    endpoints: (builder) => {
        return {

            // Get Solution
            fetchSolution: builder.query({
                query: (body) => ({
                    url: `${body.id}/`,
                    method: "GET",
                }),
                providesTags: ["Solution"],
            }),

            // Add a Solution
            addSolution: builder.mutation({
                query: (body) => ({
                    url: '/',
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Solution"],
            }),

            changeSolutionStatus: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["Solution"],
            }),

            // Update A Solution
            updateSolution: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["Solution"],
            }),

            // Delete a Solution
            deleteSolution: builder.mutation({
                query: (id) => ({
                    url: `/${id}/`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Solution", "RabbitHoles"],
            }),
        };
    },
});

export const {
    useFetchSolutionQuery,
    useAddSolutionMutation,
    useChangeSolutionStatusMutation,
    useUpdateSolutionMutation,
    useDeleteSolutionMutation,
} = apiSolutionSlice;