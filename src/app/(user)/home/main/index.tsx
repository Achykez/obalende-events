"use client";
import React, { useRef } from "react";
import UpComingHandler from "@/components/upcomingHandler";
import OngoingHandler from "@/components/ongoingHandler";
import { EventsResponse } from "@/redux/api/events";
import { WEBSITE_DETAILS } from "@/config";
import styled from "styled-components";
import { Calender } from "@/assets";

export default function Main({
  upcomingData,
  ongoingData,
}: {
  upcomingData: EventsResponse[];
  ongoingData: EventsResponse[];
}) {
  const ref = useRef<any>(null);

  return (
    <Wrapper>
      <div className="main-header">
        <h2>Ongoing Event</h2>
        <span onClick={() => ref?.current.click()}>View more</span>
      </div>
      <div className="main-body">
        <OngoingHandler ref={ref} data={ongoingData[0]} />
      </div>
      <div className="main-header">
        <h2>Upcoming Events</h2>
      </div>
      <div className="main-body">
        {upcomingData.length > 0 ? (
          upcomingData.map((item, index) => (
            <UpComingHandler
              key={index}
              title={item.event.name}
              location={WEBSITE_DETAILS.address}
              id={item.event._id}
              image={item.event.image}
              data={item.participants}
            />
          ))
        ) : (
          <EmptyState>
            <Calender />
            <p>No Upcoming Karoke Events</p>
          </EmptyState>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px 20px;

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
      color: #32329f;
    }
  }

  .main-body {
    display: flex;
    overflow-x: scroll;
    align-items: center;
    gap: 20px;
    padding: 10px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  color: #666;

  p {
    margin-top: 10px;
    font-size: 16px;
  }
`;
