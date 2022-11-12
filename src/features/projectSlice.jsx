import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiProjectSlice = createApi({
    reducerPath: "apiProject",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/projects",
        prepareHeaders(headers) {
            // const token = localStorage.getItem("token");
            // headers.localStorage("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Projects"],
    refetchOnFocus: true,

    endpoints: (builder) => {
        return {
            // Get All Projects by Archived status
            fetchAllProjectsByArchiveSts: builder.query({
                query(body) {
                    return `/archive/${body.status}/`;
                },
                providesTags: ["Projects"],
            }),

            // Get All Projects (Admin)
            fetchAllProjectsAdmin: builder.query({
                query(body) {
                    return `/admin/`;
                },
                providesTags: ["Projects"],
            }),

            // Add a Project
            addProject: builder.mutation({
                query: (body) => ({
                    url: "/",
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Projects"],
            }),

            // Update A Project
            updateProject: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["Projects"],
            }),

            changeProjectStatus: builder.mutation({
                query: (body) => ({
                    url: `/${body.id}/`,
                    method: "PATCH",
                    body,
                }),
                invalidatesTags: ["Projects"],
            }),

            // Delete a Project
            deleteProject: builder.mutation({
                query: (id) => ({
                    url: `/${id}/`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Projects"],
            }),
        };
    },
});

export const {
    useFetchAllProjectsByArchiveSts,
    useFetchAllProjectsAdminQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useChangeProjectStatusMutation,
} = apiProjectSlice;

// export default apiProjectSlice.reducer;