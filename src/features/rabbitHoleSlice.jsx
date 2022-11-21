import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRabbitHoleSlice = createApi({
    reducerPath: "apiImageLibrary",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/rabbit_holes",
        // prepareHeaders(headers) {
        //     // const token = localStorage.getItem("token");
        //     // headers.localStorage("authorization", `Bearer ${token}`);
        //     // headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
        //     headers.set("Content-Type", "multipart/form-data");
            // console.log([...headers]);
        //     return headers;
        // },
    }),
    tagTypes: ["RabbitHoles"],
    refetchOnFocus: true,

    endpoints: (builder) => {
        return {
            // Get All Images by Project ID
            fetchAllRabbitHoles: builder.query({
                query(body) {
                    return `/project/${body}/`;
                },
                providesTags: ["RabbitHoles"],
            }),

            // Get All Images for a Project
            fetchAllRabbitHolesAdmin: builder.query({
                query(body) {
                    return `/`;
                },
                providesTags: ["RabbitHoles"],
            }),

            // Add a Image
            addRabbitHole: builder.mutation({
                query: (body) => ({
                    url: `/project/${body.projectId}/`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            changeRabbitHoleStatus: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            // Update A Image
            updateRabbitHole: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PATCH",
                    body:body.formData,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            // Delete a Image
            deleteRabbitHole: builder.mutation({
                query: (id) => ({
                    url: `/${id}/`,
                    method: "DELETE",
                }),
                invalidatesTags: ["RabbitHoles"],
            }),
        };
    },
});

export const {
    useFetchAllRabbitHolesQuery,
    useFetchAllRabbitHolesAdminQuery,
    useAddRabbitHoleMutation,
    useChangeRabbitHoleStatusMutation,
    useUpdateRabbitHoleMutation,
    useDeleteRabbitHoleMutation,
} = apiRabbitHoleSlice;