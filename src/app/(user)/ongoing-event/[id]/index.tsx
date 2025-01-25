"use client"
import React, { FC, useMemo } from "react";
import OngoingHeader from "./ongoing-header";
import { OngoingBody } from "./ongoing-body";
import { useGetEventsQuery } from "@/redux/api/events";
import { useGetEventParticipantQuery } from "@/redux/api/participants";
import { Spin } from "antd";

interface IProps {
  id: string;
}
const OngoingEvents: FC<IProps> = ({ id }) => {
  const { data: eventsData, isLoading } = useGetEventsQuery({ id });
  const { data: participantsData, isLoading: isGettingParticipants } =
    useGetEventParticipantQuery(id);

  const eventDetails = useMemo(() => {
    return eventsData?.data?.find((event) => event.event._id === id) || null;
  }, [id, eventsData?.data]);
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
