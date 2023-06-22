import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false,
    userProfile: null,
    emailVerificationSent: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.userProfile = null;
      state.emailVerificationSent = false;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    setEmailVerificationSent(state, action) {
      state.emailVerificationSent = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setUserProfile,
  setEmailVerificationSent,
} = authSlice.actions;

export default authSlice.reducer;
