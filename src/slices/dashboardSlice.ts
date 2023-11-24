import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";
import { Project } from "./taskSlice";

export type NewDashboard = {
  name: string;
  description: string;
  project: Project | null;
  // status: string
};

export type Dashboard = NewDashboard & {
  id: string;
  project: Project;
};

export type NewDashboardPayload = {
  projectId: string;
  name: string;
  description: string;
};

export type UpdateDashboardPayload = {
  projectId: string;
  name: string;
  description: string;
};

export type NewDashboardFinal = NewDashboard & {
  project: Project;
};

export type DashboardBasicInfo = NewDashboardPayload & {
  id: string;
};

interface DashboardState {
  dashboards: DashboardBasicInfo[];
  selectedDashboard: DashboardBasicInfo | undefined;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: DashboardState = {
  dashboards: [],
  selectedDashboard: undefined,
  status: "idle",
  error: null,
};

export const getDashboards = createAsyncThunk(
  "dashboards/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboards");
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

export const getDashboard = createAsyncThunk(
  "dashboards/getOne",
  async (dashboardId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/dashboards/${dashboardId}`);
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

export const createDashboard = createAsyncThunk(
  "dashboards/createOne",
  async (dashboard: NewDashboardFinal, { rejectWithValue }) => {
    try {
      const dashboardPayload: NewDashboardPayload = {
        name: dashboard.name,
        description: dashboard.description,
        projectId: dashboard.project.id,
      };
      const response = await axiosInstance.post(
        "/dashboards",
        dashboardPayload
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

export const updateDashboard = createAsyncThunk(
  "dashboards/updateOne",
  async (dashboard: Dashboard, { rejectWithValue }) => {
    try {
      const updateDashboardPayload: UpdateDashboardPayload = {
        name: dashboard.name,
        description: dashboard.description,
        projectId: dashboard.project.id,
      };
      const response = await axiosInstance.patch(
        `/dashboards/${dashboard.id}`,
        updateDashboardPayload
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

// export const fetchDashboards = createAsyncThunk(
//     'dashboards/fetchDashboards',
//     async () => {
//         const response = await axios.get(`${backendBaseUrl}/dashboards`)
//         return response.data
//     }
// )

// export const getDashboard = createAsyncThunk(
//   "dashboards/getDashboard",
//   async (dashboardId: number) => {
//     const response = await axios.get(`${backendBaseUrl}/dashboards/${dashboardId}`);
//     return response.data;
//   }
// );

// export const addDashboard = createAsyncThunk(
//     "dashboards/addDashboard",
//     async (dashboard: NewDashboard) => {
//       const dashboardPayload: NewDashboard = {
//         name: dashboard.name,
//         description: dashboard.description,
//         projectId: dashboard.projectId
//       };
//       const response = await axios.post(`${backendBaseUrl}/dashboards`, dashboardPayload);
//       return response.data;
//     }
//   );

// export const updateDashboard = createAsyncThunk(
//   "dashboards/updateDashboard",
//   async (dashboard: Dashboard) => {
//     const updateDashboardPayload: NewDashboard = {
//       name: dashboard.name,
//       description: dashboard.description,
//       projectId: dashboard.projectId
//     };
//     const response = await axios.patch(
//       `${backendBaseUrl}/dashboards/${dashboard.id}`,
//       updateDashboardPayload
//     );
//     return response.data;
//   }
// );

export const dashboardSlice = createSlice({
  name: "Dashboards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDashboards.fulfilled,
        (state, action: PayloadAction<DashboardBasicInfo[]>) => {
          state.status = "idle";
          state.dashboards = action.payload;
        }
      )
      .addCase(getDashboards.rejected, (state) => {
        state.status = "failed";
        state.dashboards = [];
      })
      .addCase(getDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getDashboard.fulfilled,
        (state, action: PayloadAction<DashboardBasicInfo>) => {
          state.status = "idle";
          state.selectedDashboard = action.payload;
        }
      )
      .addCase(getDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.selectedDashboard = undefined;
        state.error = action.error.message || "Failed to fetch dashboard.";
      })

      .addCase(createDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createDashboard.fulfilled,
        (state, action: PayloadAction<DashboardBasicInfo>) => {
          state.status = "idle";
          state.dashboards.push(action.payload);
        }
      )
      .addCase(createDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add dashboard.";
      })

      .addCase(updateDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateDashboard.fulfilled,
        (state, action: PayloadAction<DashboardBasicInfo>) => {
          state.status = "idle";
          const updatedTask = action.payload;
          const index = state.dashboards.findIndex(
            (dashboard) => dashboard.id === updatedTask.id
          );
          if (index !== -1) {
            state.dashboards[index] = updatedTask;
          }
        }
      )
      .addCase(updateDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update dashboard.";
      });
  },
});

export default dashboardSlice.reducer;
