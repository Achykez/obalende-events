"use client";
import React, { FC, useMemo } from "react";
import ClosedEventHeader from "./closed-header";
import { ClosedEventBody } from "./closed-body";
import { useGetEventsQuery } from "@/redux/api/events";
import { useGetParticipantVotesQuery } from "@/redux/api/participants";
import { Spin } from "antd";

interface IProps {
  id: string;
}

const ClosedEvent: FC<IProps> = ({ id }) => {
  const { data: eventsData, isLoading } = useGetEventsQuery({ id });
  const { data: participantsData, isLoading: isGettingParticipants } =
    useGetParticipantVotesQuery(id);

  const eventDetails = useMemo(() => {
    return eventsData?.data?.find((event) => event.event._id === id) || null;
  }, [id, eventsData?.data]);

  const winner = useMemo(() => {
    if (!participantsData?.data) return null;
    return participantsData.data.reduce((prev, current) =>
      (prev.totalVotes ?? 0) > (current.totalVotes ?? 0) ? prev : current
    );
  }, [participantsData?.data]);

  return (
    <Spin spinning={isLoading || isGettingParticipants} size={"default"}>
      <ClosedEventHeader data={eventDetails} />
      <ClosedEventBody
        eventDetails={eventDetails}
        winner={winner}
        participantsData={participantsData?.data}
      />
    </Spin>
  );
};

export default ClosedEvent;