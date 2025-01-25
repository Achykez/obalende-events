import { baseApi } from "@/redux/baseApi";
import { EventsResponse, IEventParams, IEventsPayload } from "./interface";
import { ApiResponse, Response } from "@/redux/api/genericInterface";
import { tagTypes } from "@/redux/baseApi/tagTypes";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<Response, IEventsPayload>({
      query: (payload) => ({
        url: "/event/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [{ type: tagTypes.EVENTS }],
    }),
    getEvents: builder.query<ApiResponse<EventsResponse>, IEventParams | undefined>({
      query: (params) => ({
        url: "/event",
        method: "GET",
        params
      }),
      providesTags: [{ type: tagTypes.EVENTS }],
    }),
    uploadContent: builder.mutation<Response, FormData>({
      query: (credentials) => ({
        url: "/user/upload-images",
        method: "POST",
        data: credentials,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    }),
    updateEvents: builder.mutation<ApiResponse<string>, Partial<IEventsPayload>>({
      query: (payload) => ({
        url: `/event/update`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [{ type: tagTypes.EVENTS }],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useUploadContentMutation,
  useGetEventsQuery,
  useUpdateEventsMutation,
} = eventsApi;
