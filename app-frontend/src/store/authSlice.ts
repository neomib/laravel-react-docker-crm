import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("token"),
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, setUser } = authSlice.actions;

export default authSlice.reducer;
