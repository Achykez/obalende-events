export interface IParticipantPayload {
  name: string;
  alias: string;
  address: string;
  eventId: string;
  phoneNumber: string;
  // remember_me: boolean;
}
export interface IParticipant {
  _id: string;
  name: string;
  alias: string;
  phoneNumber: string;
  address: string;
  image: string;
  eventId: string;
  suspended: boolean;
  createdAt: string; // Use Date if you prefer converting it to a Date object.
  updatedAt: string;
}
