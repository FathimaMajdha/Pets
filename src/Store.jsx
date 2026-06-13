import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./pages/LoginSlice";
import RegisterReducer from "./pages/RegisterSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: RegisterReducer,
  },
});

export default store;