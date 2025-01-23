import { baseApi } from "@/redux/baseApi";
import { IEventsPayload} from "./interface";
import { Response } from "@/redux/api/genericInterface";
import { createFormData } from "@/utils";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<Response, IEventsPayload>({
      query: (payload) => ({
        url: "/event/create",
        method: "POST",
        data: createFormData(payload),
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      }),
    }),
    getEvents: builder.query<Response, IEventsPayload>({
      query: (payload) => ({
        url: "/event/create",
        method: "GET",
        data: createFormData(payload),
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,

} = eventsApi;
