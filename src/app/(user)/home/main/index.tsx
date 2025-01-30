"use client";
import React, { useRef } from "react";
import UpComingHandler from "@/components/upcomingHandler";
import OngoingHandler from "@/components/ongoingHandler";
import { EventsResponse } from "@/redux/api/events";
import { WEBSITE_DETAILS } from "@/config";
import styled from "styled-components";
import { Calender } from "@/assets";
import ClosedEventHandler from "@/components/closedHandler";

export default function Main({
  upcomingData,
  ongoingData,
  closedEvents,
}: {
  upcomingData: EventsResponse[];
  ongoingData: EventsResponse[];
  closedEvents: EventsResponse[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper isReverse={ongoingData.length < 1}>
      <div>
        <div className="main-header">
          <h2>Live Event</h2>
          {ongoingData.length > 0 && (
            <span onClick={() => ref?.current?.click()}>View more</span>
          )}
        </div>
        <div className="main-body">
          {ongoingData.length > 0 ? (
            <OngoingHandler ref={ref} data={ongoingData[0]} />
          ) : (
            <EmptyState>
              <Calender />
              <p>No Ongoing Karoke Events</p>
            </EmptyState>
          )}
        </div>
      </div>
      <ColumnFlex>
        <div>
          <div className="main-header">
            <h2>Upcoming Events</h2>
            <span
              className="underline"
              onClick={() => {
                registerRef?.current?.click();
              }}>
              Click to Register
            </span>
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
                  ref={registerRef}
                  index={index}
                />
              ))
            ) : (
              <EmptyState>
                <Calender />
                <p>No Upcoming Karoke Events</p>
              </EmptyState>
            )}
          </div>
        </div>
        <div>
          <div className="main-header">
            <h2>Past Events</h2>
          </div>
          <div className="main-body">
            {closedEvents.length > 0 ? (
              closedEvents.map((item, index) => (
                <ClosedEventHandler
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
                <p>No Past Events yet</p>
              </EmptyState>
            )}
          </div>
        </div>
      </ColumnFlex>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isReverse: boolean }>`
  padding: 10px 20px;
  display: flex;
  flex-direction: ${({ isReverse }) =>
    isReverse ? "column-reverse" : "column"};

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;

    span {
      font-size: 12px;
      color: #32329f;
      text-decoration: underline;
      font-weight: 600;
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
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
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
