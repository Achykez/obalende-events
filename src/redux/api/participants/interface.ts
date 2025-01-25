export interface IParticipantPayload {
  name: string;
  alias: string;
  address: string;
  eventId: string;
  phoneNumber: string;
  image?: string;
  // remember_me: boolean;
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
}


export interface IEditParticipant  extends IParticipantPayload{
  id: string;
}