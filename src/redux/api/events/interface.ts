import { EventStatus } from "@/config";
import { IParticipant } from "../participants";

export interface IEventsPayload {
  name: string;
  startTime: string;
  endTime: string;
  image: string;
  status?: EventStatus;
  description: string;
  eventId?: string;
}
export interface EventsResponse {
  event: {
    _id: string;
    name: string;
    startTime: string; // Use Date if you prefer parsing these to actual Date objects.
    endTime: string; // Same here.
    status: EventStatus; // Extend this as needed for other statuses.
    createdAt: string;
    updatedAt: string;
    description: string;
    image: string;
  };
  participants?: IParticipant[];
}

export interface IEventParams {
  name?: string;
  status?: string;
  startTime?: string;
  endTime?: string;
  id?: string;
}
