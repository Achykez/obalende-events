export interface IEventsPayload {
  [key: string]: unknown;
  name: string;
  startTime: string;
  endTime: string;
  image: File;
  // remember_me: boolean;
}
export interface IRegisterPayload {
  email: string;
  password: string;
  first_name: string;
}
export interface IForgetPasswordPayload {
  email: string;
}
export interface IConfirmPasswordPayload {
  email: string;
  token: string;
}
export interface IResetPasswordPayload {
  password_token: string;
  password: string;
  email: string
}

export interface IConfirmPasswordResponse {
  accessToken: string;
}
