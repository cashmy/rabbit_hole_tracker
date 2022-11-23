import { baseApiSlice } from "./rhBaseApiSlice";

export const apiRabbitHoleSlice = baseApiSlice.injectEndpoints({

    endpoints: (build) => {
        return {
            // Get All Rabbit Holes by Project ID
            fetchAllRabbitHoles: build.query({
                query(body) {
                    return `/rabbit_holes/project/${body}/`;
                },
                providesTags: ["RabbitHoles"],
            }),

            // Get All Rabbit Holes for a Project
            fetchAllRabbitHolesAdmin: build.query({
                query(body) {
                    return `/rabbit_holes/`;
                },
                providesTags: ["RabbitHoles"],
            }),

            // Add a Rabbit Hole
            addRabbitHole: build.mutation({
                query: (body) => ({
                    url: `/rabbit_holes/project/${body.project_id}/`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            changeRabbitHoleStatus: build.mutation({
                query: (body) => ({
                    url: `/rabbit_holes/${body.id}/`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            // Update A Rabbit Hole
            updateRabbitHole: build.mutation({
                query: (body) => ({
                    url: `/rabbit_holes/${body.id}/`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            // Delete a Rabbit Hole
            deleteRabbitHole: build.mutation({
                query: (id) => ({
                    url: `/rabbit_holes/${id}/`,
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