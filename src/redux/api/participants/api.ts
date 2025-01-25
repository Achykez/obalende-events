import { baseApi } from "@/redux/baseApi";
import {
  IEditParticipant,
  IParticipant,
  IParticipantPayload,
} from "./interface";
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
      providesTags: [{ type: tagTypes.PARTICIPANTS }],
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
      IEditParticipant
    >({
      query: (payload) => ({
        url: `/participant/update`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [{ type: tagTypes.PARTICIPANTS }],
    }),
    deleteParticipant: builder.mutation<ApiResponse<IParticipant>, string>({
      query: (payload) => ({
        url: `/participant/delete/${payload}`,
        method: "DELETE",
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
  useDeleteParticipantMutation,
} = participantsApi;
