import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";

export type NewProject = {
  name: string;
  description: string;
  // status: string
};

export type Project = NewProject & {
  id: string;
};

interface ProjectState {
  projects: Project[];
  selectedProject: Project | undefined;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: undefined,
  status: "idle",
  error: null,
};

export const getProjects = createAsyncThunk(
  "projects/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/projects");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;

        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/getOne",
  async (projectId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;

        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createOne",
  async (project: NewProject, { rejectWithValue }) => {
    try {
      const projectPayload: NewProject = {
        name: project.name,
        description: project.description,
      };
      const response = await axiosInstance.post("/projects", projectPayload);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;

        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateOne",
  async (project: Project, { rejectWithValue }) => {
    try {
      const updateProjectPayload: NewProject = {
        name: project.name,
        description: project.description,
      };
      const response = await axiosInstance.patch(
        `/projects/${project.id}`,
        updateProjectPayload
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;

        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

// export const fetchProjects = createAsyncThunk(
//     'projects/fetchProjects',
//     async () => {
//         const response = await axios.get(`${backendBaseUrl}/projects`)
//         return response.data
//     }
// )

// export const getProject = createAsyncThunk(
//   "projects/getProject",
//   async (projectId: number) => {
//     const response = await axios.get(`${backendBaseUrl}/projects/${projectId}`);
//     return response.data;
//   }
// );

// export const addProject = createAsyncThunk(
//     "projects/addProject",
//     async (project: NewProject) => {
//       const projectPayload: NewProject = {
//         name: project.name,
//         description: project.description
//       };
//       const response = await axios.post(`${backendBaseUrl}/projects`, projectPayload);
//       return response.data;
//     }
//   );

// export const updateProject = createAsyncThunk(
//   "projects/updateProject",
//   async (project: Project) => {
//     const updateProjectPayload: NewProject = {
//       name: project.name,
//       description: project.description
//     };
//     const response = await axios.patch(
//       `${backendBaseUrl}/projects/${project.id}`,
//       updateProjectPayload
//     );
//     return response.data;
//   }
// );

export const projectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "idle";
          state.projects = action.payload;
        }
      )
      .addCase(getProjects.rejected, (state) => {
        state.status = "failed";
        state.projects = [];
      })
      .addCase(getProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.status = "idle";
          state.selectedProject = action.payload;
        }
      )
      .addCase(getProject.rejected, (state, action) => {
        state.status = "failed";
        state.selectedProject = undefined;
        state.error = action.error.message || "Failed to fetch project.";
      })

      .addCase(createProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.status = "idle";
          state.projects.push(action.payload);
        }
      )
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add project.";
      })

      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.status = "idle";
          const updatedProject = action.payload;
          const index = state.projects.findIndex(
            (project) => project.id === updatedProject.id
          );
          if (index !== -1) {
            state.projects[index] = updatedProject;
          }
        }
      )
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update project.";
      });
  },
});

export default projectSlice.reducer;
