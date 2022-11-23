import { baseApiSlice } from "./rhBaseApiSlice";

export const apiImageLibrarySlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            // Get All Images by User
            fetchAllImagesByUser: builder.query({
                query() {
                    return `/`;
                },
                providesTags: ["Images"],
            }),

            // Get All Images (Admin)
            fetchAllImagesAdmin: builder.query({
                query(body) {
                    return `/images/`;
                },
                providesTags: ["Images"],
            }),

            // Add a Image
            addImage: builder.mutation({
                query: (body) => ({
                    url: "/images/",
                    method: "POST",
                    body,
                    dataType: "jsonp",
                }),
                invalidatesTags: ["Images"],
            }),

            // Update A Image
            updateImage: builder.mutation({
                query: (body) => ({
                    url: `/images/${body.id}/`,
                    method: "PATCH",
                    body:body.formData,
                    dataType: "jsonp",
                }),
                invalidatesTags: ["Images"],
            }),

            // Delete a Image
            deleteImage: builder.mutation({
                query: (id) => ({
                    url: `/images/${id}/`,
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