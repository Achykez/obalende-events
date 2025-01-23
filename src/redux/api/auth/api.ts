import { baseApi } from "@/redux/baseApi";
import { ILoginPayload } from "./interface";
import { Response } from "@/redux/api/genericInterface";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response<{ email: string }>, ILoginPayload>({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  // useForgotPasswordMutation,
  // useResetPasswordMutation,
  // useConfirmPasswordMutation,
  // useRegisterMutation
} = authApi;
