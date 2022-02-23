import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../constants/status";
import { ACCESS_TOKEN } from "../constants/localStorage";

const initialState = {
  errorMessage: "",
  loginStatus: REQUEST_STATUS.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    loginRequest: (state) => {
      state.loginStatus = REQUEST_STATUS.REQUESTING;
    },
    loginSuccess: (state, { payload: { token } }) => {
      if (token) localStorage.setItem(ACCESS_TOKEN, token);
      state.loginStatus = REQUEST_STATUS.SUCCESS;
    },
    loginFail: (state, { payload }) => {
      state.loginStatus = REQUEST_STATUS.ERROR;
      state.errorMessage = payload;
    },
  },
});
export const { setErrorMessage, loginRequest, loginSuccess, loginFail } =
  authSlice.actions;
export default authSlice.reducer;
