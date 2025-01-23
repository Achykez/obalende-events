export interface IEventsPayload {
  [key: string]: unknown;
  name: string;
  startTime: string;
  endTime: string;
  image: string;
  // remember_me: boolean;
}
export interface EventsResponse {
  _id: string;
  name: string;
  startTime: string; // Use Date if you prefer parsing these to actual Date objects.
  endTime: string;   // Same here.
  status: "UPCOMING" | "ONGOING" | "COMPLETED"; // Extend this as needed for other statuses.
  createdAt: string;
  updatedAt: string;
}


