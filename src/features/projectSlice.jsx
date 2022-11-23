
import { baseApiSlice } from "./rhBaseApiSlice";

export const apiProjectSlice = baseApiSlice.injectEndpoints({

    endpoints: (builder) => {
        return {
            // Get All Projects by Archived status
            fetchAllProjectsByArchiveSts: builder.query({
                query(body) {
                    return `/projects/archive/${body}/`;
                },
                providesTags: ["Projects"],
            }),

            // Get All Projects (Admin)
            fetchAllProjectsAdmin: builder.query({
                query(body) {
                    return `/projects/admin/`;
                },
                providesTags: ["Projects"],
            }),

            // Add a Project
            addProject: builder.mutation({
                query: (body) => ({
                    url: "/projects/",
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Projects"],
            }),

            // Update A Project
            updateProject: builder.mutation({
                query: (body) => ({
                    url: `/projects/${body.id}/`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["Projects"],
            }),

            changeProjectStatus: builder.mutation({
                query: (body) => ({
                    url: `/projects/${body.id}/`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["Projects"],
            }),

            // Delete a Project
            deleteProject: builder.mutation({
                query: (id) => ({
                    url: `/projects/${id}/`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Projects"],
            }),
        };
    },
});

export const {
    useFetchAllProjectsByArchiveStsQuery,
    useFetchAllProjectsAdminQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useChangeProjectStatusMutation,
} = apiProjectSlice;

// export default apiProjectSlice.reducer;