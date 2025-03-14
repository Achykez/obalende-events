import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
import { Constants } from "@/redux/enums";
import { RootState } from "@/redux/stores";
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS } from "@/config";

export interface IUser {
  email: string;
}

export interface LoginResponse {
  data: {
    email: string;
  };
  token: string;
  message: string;
}

interface AuthState {
  user: IUser | null;
  rememberMe: boolean;
}

const getUserFromCookie = (): IUser | null => {
  const userString = getCookie(Constants.USER)?.toString();
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};
const getRememberMeCookie = (): { rememberMe: boolean } | null => {
  const rememberMe = getCookie(Constants.REMEMBER_ME);
  if (rememberMe) {
    return JSON.parse(rememberMe);
  }
  return null;
};

const rememberCookie = getRememberMeCookie();

const initialState: AuthState = {
  user: getUserFromCookie(),
  rememberMe: rememberCookie?.rememberMe ?? false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<LoginResponse>) {
      const userDetails = action.payload;
      const cookieOptions = state.rememberMe
        ? { maxAge: ONE_DAY_SECONDS }
        : { maxAge: ONE_HOUR_SECONDS };

      // setCookie(Constants.USER, JSON.stringify(userDetails), cookieOptions);

      // state.user = action.payload;
      setCookie(Constants.TOKEN, userDetails.token, cookieOptions);
    },
    setRememberMe(state, action: PayloadAction<boolean>) {
      const cookieOptions = state.rememberMe
        ? { maxAge: ONE_DAY_SECONDS }
        : { maxAge: ONE_HOUR_SECONDS };

      const cookieString = JSON.stringify({ rememberMe: action.payload });
      setCookie(Constants.REMEMBER_ME, cookieString, cookieOptions);
      state.rememberMe = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.rememberMe = false;
    },
  },
});

export const { setUser, setRememberMe, clearUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectRememberMe = (state: RootState) => state.auth.rememberMe;

export default authSlice;
