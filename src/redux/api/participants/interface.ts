export interface IParticipantPayload {
  name: string;
  alias: string;
  address: string;
  eventId: string;
  phoneNumber: string;
  image?: string;
  // remember_me: boolean;
}

export interface IUnverifiedParticipantPayload extends IParticipantPayload {
  proof: string;
}
export interface IParticipant {
  _id: string;
  name: string;
  alias: string;
  phoneNumber: string;
  votes: number;
  address: string;
  image: string;
  eventId: string;
  suspended: boolean;
  createdAt: string; // Use Date if you prefer converting it to a Date object.
  updatedAt: string;
  proof?: string;
  verified?: boolean;
  totalVotes?: number;
}

export interface IVotes {
  _id: string;
  numberOfVotes: number;
  participantId: string;
  proof: string;
  verified: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  registeredBy: string;
}

export interface IEditParticipant extends IParticipantPayload {
  id: string;
}

export interface IVoteParticipant {
  participantId: string;
  numberOfVotes: number;
  proof: string;
}
