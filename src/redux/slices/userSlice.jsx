import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userDetails: [],
  userProfileStatus:{},
  isAdminAuthenticated: !!localStorage.getItem("adminLoginToken"),
};

const adminUserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoginUser: (state, action) => {
      state.isAdminAuthenticated = true;
      state.userName = action.payload;
    },
    setGetAllUserDetails: (state, action) => {
      state.isAdminAuthenticated = true;
      state.userDetails = action.payload ;
    },
    setUpdateProfileStatus: (state,action) => {
      const updatedUser = action.payload;
      state.userProfileStatus = {
        ...state.userProfileStatus,
        ...updatedUser,
      };
      state.userDetails = state.userDetails.result.map(user =>
        user._id === updatedUser._id ? { ...user, ...updatedUser } : user
      );
    },
    setDeleteUserById: (state, action) => {
      const userIdToDelete = action.payload;
      state.userDetails.result = state.userDetails.result.filter(
        user => user._id !== userIdToDelete
      );
    },
    logout: (state) => {
      state.isAdminAuthenticated = false;
      state.userName = "";
      localStorage.removeItem("adminLoginToken");
    },
  },
});

export const { setAdminLoginUser, setGetAllUserDetails, setUpdateProfileStatus,setDeleteUserById, logout } =
  adminUserSlice.actions;

export default adminUserSlice.reducer;
