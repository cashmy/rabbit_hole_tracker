import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiImageLibrarySlice = createApi({
    reducerPath: "apiImageLibrary",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/images",
        // prepareHeaders(headers) {
        //     // const token = localStorage.getItem("token");
        //     // headers.localStorage("authorization", `Bearer ${token}`);
        //     // headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
        //     headers.set("Content-Type", "multipart/form-data");
            // console.log([...headers]);
        //     return headers;
        // },
    }),
    tagTypes: ["Images"],
    refetchOnFocus: true,

    endpoints: (builder) => {
        return {
            // Get All Images by User
            fetchAllImagesByUser: builder.query({
                query() {
                    return `/`;
                },
                providesTags: ["Projects"],
            }),

            // Get All Images (Admin)
            fetchAllImagesAdmin: builder.query({
                query(body) {
                    return `/`;
                },
                providesTags: ["Images"],
            }),

            // Add a Image
            addImage: builder.mutation({
                query: (body) => ({
                    url: "/",
                    method: "POST",
                    body,
                    dataType: "jsonp",
                }),
                invalidatesTags: ["Images"],
            }),

            // Update A Image
            updateImage: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PATCH",
                    body:body.formData,
                    dataType: "jsonp",
                }),
                invalidatesTags: ["Images"],
            }),

            // Delete a Image
            deleteImage: builder.mutation({
                query: (id) => ({
                    url: `/${id}/`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Images"],
            }),
        };
    },
});

export const {
    useFetchAllImagesByUserQuery,
    useFetchAllImagesAdminQuery,
    useAddImageMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
} = apiImageLibrarySlice;