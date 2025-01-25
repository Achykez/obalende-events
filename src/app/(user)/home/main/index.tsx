"use client";
import React from "react";
import UpComingHandler from "@/components/upcomingHandler";
import styles from "./main.module.css";
import OngoingHandler from "@/components/ongoingHandler";
import { EventsResponse,  } from "@/redux/api/events";
import { WEBSITE_DETAILS } from "@/config";
import styled from "styled-components";

export default function Main({
  upcomingData,
  ongoingData
}: {
  upcomingData: EventsResponse[];
  ongoingData: EventsResponse[];
}) {
  return (
    <Wrapper>
      <div className={styles.mainHeaderContainer}>
        <h2>Ongoing Event</h2>
      </div>
      <div
        className={styles.mainBodyContainer}
        style={{
          display: "flex",
          overflow: "scroll",
          alignItems: "center",
          gap: "20px",
          padding: "10px",
        }}>
        <OngoingHandler data={ongoingData[0]}/>
      </div>
      <div className={styles.mainHeaderContainer}>
        <h2>Upcoming Events</h2>
      </div>
      <div
        className={styles.mainBodyContainer}
        style={{
          display: "flex",
          overflow: "scroll",
          alignItems: "center",
          gap: "20px",
          padding: "10px",
        }}>
        {upcomingData?.map((Item, index) => (
          <UpComingHandler
            key={index}
            title={Item.event.name}
            location={WEBSITE_DETAILS.address}
            id={Item.event._id}
            image={Item.event.image}
            data={Item.participants}
          />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px 20px;
`