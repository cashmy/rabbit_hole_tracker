import { baseApiSlice } from "./rhBaseApiSlice";

export const apiSolutionSlice = baseApiSlice.injectEndpoints({

    endpoints: (build) => {
        return {

            // Get Solution
            fetchSolution: build.query({
                query: (body) => ({
                    url: `/solutions/${body.id}/`,
                    method: "GET",
                }),
            }),

            // Add a Solution
            addSolution: build.mutation({
                query: (body) => ({
                    url: '/solutions/',
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            changeSolutionStatus: build.mutation({
                query: (body) => ({
                    url: `/solutions/${body.id}/`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            // Update A Solution
            updateSolution: build.mutation({
                query: (body) => ({
                    url: `/solutions/${body.id}/`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["RabbitHoles"],
            }),

            // Delete a Solution
            deleteSolution: build.mutation({
                query: (id) => ({
                    url: `/solutions/${id}/`,
                    method: "DELETE",
                }),
                invalidatesTags: ["RabbitHoles"],
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