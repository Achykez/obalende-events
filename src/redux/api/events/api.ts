import { baseApi } from "@/redux/baseApi";
import { EventsResponse, IEventsPayload } from "./interface";
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
    getEvents: builder.query<ApiResponse<EventsResponse>, void>({
      query: () => ({
        url: "/event",
        method: "GET",
      }),
      providesTags: [{ type: tagTypes.EVENTS }],
    }),
    uploadContent: builder.mutation<Response, FormData>({
      query: (credentials) => ({
        url: "/user/upload-images",
        method: "POST",
        body: credentials,
      }),
    }),
    updateEvents: builder.mutation<Response, Partial<IEventsPayload>>({
      query: (payload) => ({
        url: `/event/update`,
        method: "PUT",
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
