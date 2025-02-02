"use client";
import React, { FC, useMemo } from "react";
import OngoingHeader from "./ongoing-header";
import { OngoingBody } from "./ongoing-body";
import { useGetEventsQuery } from "@/redux/api/events";
import { useGetParticipantVotesQuery } from "@/redux/api/participants";
import { Spin } from "antd";
import { EventStatus } from "@/config";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
}
const OngoingEvents: FC<IProps> = ({ id }) => {
  const { data: eventsData, isLoading } = useGetEventsQuery({ id });
  const { data: participantsData, isLoading: isGettingParticipants } =
    useGetParticipantVotesQuery(id);
  const router = useRouter();

  const eventDetails = useMemo(() => {
    return eventsData?.data?.find((event) => event.event._id === id) || null;
  }, [id, eventsData?.data]);
  if (eventDetails && eventDetails.event.status !== EventStatus.ongoing) {
    router.replace("/");
  }
  return (
    <Spin spinning={isLoading || isGettingParticipants} size={"default"}>
      <OngoingHeader data={eventDetails} />
      <OngoingBody
        eventDetails={eventDetails}
        participantsData={participantsData?.data}
      />
    </Spin>
  );
};

export default OngoingEvents;
