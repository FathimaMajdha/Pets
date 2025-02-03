import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRegisteredUser = createAsyncThunk(
  "/register/fetchRegisteredUser",
  async ({ username, email, password, phoneNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const existingUsers = response.data;

      const userExists = existingUsers.some((user) => user.email === email || user.username === username);

      if (userExists) {
        alert("User already exists. Please use a different email or username.");
      } else {
        const newUser = {
          username,
          email,
          password,
          phoneNumber,
          isBlocked: false,
        };

        const registerResponse = await axios.post("http://localhost:3000/users", newUser);

        if (registerResponse.status === 201) {
          localStorage.setItem("userId", registerResponse.data.id);
          alert("User registered successfully!");
          return registerResponse.data;
        } else {
          throw new Error("Failed to register. Please try again.");
        }
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const RegisterSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisteredUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRegisteredUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default RegisterSlice.reducer;
