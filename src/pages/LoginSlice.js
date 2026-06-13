import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";

const ADMIN_EMAIL = "admin@gmail.com";

export const fetchLoginUser = createAsyncThunk(
  "login/fetchLoginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Auth/login", {
        email,
        password,
      });

      const result = response.data;

      if (!result?.success) {
        return rejectWithValue(result?.message || "Login failed");
      }

      const { token, user } = result?.data || {};

      if (!token || !user) {
        return rejectWithValue("Invalid response from server.");
      }

      
      localStorage.setItem("token", token);
      localStorage.setItem("userid", user.id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("username", user.name);

      
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      return { user, isAdmin, token }; 
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Something went wrong"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isAdmin: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
      });
  },
});

export default loginSlice.reducer;
