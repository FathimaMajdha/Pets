import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLoginUser = createAsyncThunk(
  "login/fetchLoginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      const admin = users.find(
        (user) => user.email === email && user.password === password && email === "admin@gmail.com"
      );

      if (admin) {
        localStorage.setItem("userid", admin.id);
        localStorage.setItem("email", admin.email); 
        return { user: admin, isAdmin: true };
      }

     
      const userDetail = users.find(
        (user) => user.email === email && user.password === password
      );

      if (userDetail) {
        if (userDetail.isBlocked) {
          return rejectWithValue("This user can't login");
        } else {
          localStorage.setItem("userid", userDetail.id);
          localStorage.setItem("username", userDetail.username);
          return { user: userDetail, isAdmin: false };
        }
      }

      return rejectWithValue("Invalid login credentials");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAdmin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default LoginSlice.reducer;
