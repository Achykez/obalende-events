import { baseApi } from "@/redux/baseApi";
import {
  IEditParticipant,
  IParticipant,
  IParticipantPayload,
  IUnverifiedParticipantPayload,
  IVoteParticipant,
  IVotes,
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
    createUnverifiedParticipant: builder.mutation<
      Response,
      IUnverifiedParticipantPayload
    >({
      query: (payload) => ({
        url: "/participant/add-external",
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
    voteParticipants: builder.mutation<Response, IVoteParticipant>({
      query: (payload) => ({
        url: `/participant/vote`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [{ type: tagTypes.PARTICIPANTS }],
    }),
    getUnVerifiedParticipants: builder.query<ApiResponse<IParticipant>, string>(
      {
        query: (eventId) => ({
          url: `/participant/unverified/${eventId}`,
          method: "GET",
        }),
        providesTags: [{ type: tagTypes.PARTICIPANTS }],
      }
    ),
    validateParticipants: builder.mutation<Response, string>({
      query: (participantId) => ({
        url: `/participant/validate/${participantId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: tagTypes.PARTICIPANTS }],
    }),
    getUnVerifiedVotes: builder.query<ApiResponse<IVotes>, void>({
      query: () => ({
        url: "/user/votes?verified=false",
        method: "GET",
      }),
      providesTags: [{ type: tagTypes.VOTES }, { type: tagTypes.PARTICIPANTS }],
    }),
    validateVotes: builder.mutation<Response, string>({
      query: (participantId) => ({
        url: `/participant/validate-vote/${participantId}`,
        method: "POST",
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
  useVoteParticipantsMutation,
  useCreateUnverifiedParticipantMutation,
  useGetUnVerifiedParticipantsQuery,
  useGetUnVerifiedVotesQuery,
  useValidateParticipantsMutation,
  useValidateVotesMutation,
} = participantsApi;
