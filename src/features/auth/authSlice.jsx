import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialToken = Cookies.get("token") || null;

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    email: null,
    token: initialToken,
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log('setCredentials Action:', action);
      const { email, accessToken } = action.payload;
      state.email = email;
      state.token = accessToken;
      Cookies.set("token", accessToken, { expires: 1 }); 
    },

    logoutAccount: (state, action) => {
      state.email = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setCredentials, logoutAccount } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentEmail = (state) => state.authSlice.email;
export const selectCurrentToken = (state) => state.authSlice.token;
