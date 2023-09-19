import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";
import { showNotification, NotificationType } from "./notificationSlice";

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  name: string;
};

type UserBasicInfo = {
  id: string;
  name: string;
  email: string;
};

type UserProfileData = {
  name: string;
  email: string;
};

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null;
  userProfileData?: UserProfileData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  userProfileData: undefined,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "login",
  async (data: User, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/login", data);
      const resData = response.data;

      localStorage.setItem("userInfo", JSON.stringify(resData));
      dispatch(
        showNotification({
          message: resData.message || "Success",
          type: NotificationType.Success,
        })
      );

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        dispatch(
          showNotification({
            message: errorResponse.message,
            type: NotificationType.Error,
          })
        );
        return rejectWithValue(errorResponse);
      }
      dispatch(
        showNotification({
          message: "An error occurred",
          type: NotificationType.Error,
        })
      );

      throw error;
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (data: NewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/register", data);
      const resData = response.data;

      localStorage.setItem("userInfo", JSON.stringify(resData));
      dispatch(
        showNotification({
          message: resData.message || "Success",
          type: NotificationType.Success,
        })
      );

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        dispatch(
          showNotification({
            message: errorResponse.message,
            type: NotificationType.Error,
          })
        );

        return rejectWithValue(errorResponse);
      }

      dispatch(
        showNotification({
          message: "An error occurred",
          type: NotificationType.Error,
        })
      );

      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/logout", {});
      const resData = response.data;
      dispatch(
        showNotification({
          message: resData.message || "Success",
          type: NotificationType.Success,
        })
      );

      localStorage.removeItem("userInfo");

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        dispatch(
          showNotification({
            message: errorResponse.message,
            type: NotificationType.Error,
          })
        );

        return rejectWithValue(errorResponse);
      }
      dispatch(
        showNotification({
          message: "An error occurred",
          type: NotificationType.Error,
        })
      );

      throw error;
    }
  }
);

export const getUser = createAsyncThunk(
  "users/profile",
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      const resData = response.data;

      dispatch(
        showNotification({
          message: resData.message || "Success",
          type: NotificationType.Success,
        })
      );

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        dispatch(
          showNotification({
            message: errorResponse.message,
            type: NotificationType.Error,
          })
        );

        return rejectWithValue(errorResponse);
      }
      dispatch(
        showNotification({
          message: "An error occurred",
          type: NotificationType.Error,
        })
      );

      throw error;
    }
  }
);

interface ErrorResponse {
  message: string;
  // You can add other properties if needed
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";

        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Login failed";
        } else {
          state.error = action.error.message || "Login failed";
        }
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Registration failed";
        } else {
          state.error = action.error.message || "Registration failed";
        }
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.basicUserInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Logout failed";
        } else {
          state.error = action.error.message || "Logout failed";
        }
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfileData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message ||
            "Get user profile data failed";
        } else {
          state.error = action.error.message || "Get user profile data failed";
        }
      });
  },
});

export default authSlice.reducer;
