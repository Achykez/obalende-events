import { baseApi } from "@/redux/baseApi";
import { IParticipant, IParticipantPayload } from "./interface";
import { ApiResponse, Response } from "@/redux/api/genericInterface";
import { tagTypes } from "@/redux/baseApi/tagTypes";

const participantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParticipant: builder.mutation<Response, IParticipantPayload>({
      query: (payload) => ({
        url: "/participant/add",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [{ type: tagTypes.EVENTS }],
    }),
    getSingleParticpant: builder.query<Response<IParticipant>, string>({
      query: (id) => ({
        url: `/participant/${id}`,
        method: "GET",
      }),
    }),
    getEventParticipant: builder.query<ApiResponse<IParticipant>, string>({
      query: (credentials) => ({
        url: `/participant/${credentials}/event`,
        method: "GET",
      }),
      providesTags: [
        { type: tagTypes.PARTICIPANTS },
        { type: tagTypes.EVENTS },
      ],
    }),
    updateParticipant: builder.mutation<
      ApiResponse<IParticipant>,
      Partial<IParticipantPayload>
    >({
      query: (payload) => ({
        url: `/participant/update`,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: [{ type: tagTypes.PARTICIPANTS }],
    }),
  }),
});

export const {
  useCreateParticipantMutation,
  useGetSingleParticpantQuery,
  useGetEventParticipantQuery,
  useUpdateParticipantMutation,
} = participantsApi;
