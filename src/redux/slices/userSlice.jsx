import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userDetails: [],
  isAdminAuthenticated: !!localStorage.getItem("adminLoginToken"),
};

const adminUserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoginUser: (state, action) => {
      console.log("login", action);
      state.isAdminAuthenticated = true;
      state.userName = action.payload;
    },
    setGetAllUserDetails: (state, action) => {
      console.log("get admin", action);
      state.isAdminAuthenticated = true;
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
    logout: (state) => {
      state.isAdminAuthenticated = false;
      state.userName = "";
      localStorage.removeItem("adminLoginToken");
    },
  },
});

export const { setAdminLoginUser, setGetAllUserDetails, logout } =
  adminUserSlice.actions;

export default adminUserSlice.reducer;
