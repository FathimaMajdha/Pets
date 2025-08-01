import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";


export const fetchRegisteredUser = createAsyncThunk(
  "register/fetchRegisteredUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const payload = {
        name: username, 
        email,
        password,
      };

      const response = await axiosInstance.post("/Auth/register", payload);

      if (response.data.success) {
        
        return response.data.message;
      } else {
        return rejectWithValue(response.data.message || "Registration failed.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const RegisterSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisteredUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRegisteredUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RegisterSlice.reducer;
