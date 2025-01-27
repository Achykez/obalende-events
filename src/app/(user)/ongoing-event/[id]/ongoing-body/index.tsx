/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { FC } from "react";
import styles from "./style.module.css";
import { Button } from "antd";
import ArrowBlueRight from "@/assets/icons/arrow-blue-right";
import Participants from "../participants";
import { IParticipant } from "@/redux/api/participants";
import { EventsResponse } from "@/redux/api/events";
import { useRouter } from "next/navigation";

interface IProps {
  eventDetails: EventsResponse | null;
  participantsData: IParticipant[];
}

export const OngoingBody: FC<IProps> = ({ eventDetails, participantsData }) => {
  const router = useRouter();

  return (
    <div className={styles.mainBody}>
      <div className={styles.header}>
        <h2>{eventDetails?.event.name}</h2>
      </div>
      <div className={styles.participants}>
        {participantsData
          ?.filter((item) => !item.suspended)
          .map((item, index) => (
            <Participants
              key={index}
              name={item.name}
              NOV={item.votes ?? 0}
              image={item.image}
              alias={item.alias}
              id={item._id}
            />
          ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "sticky",
          bottom: 0,
        }}>
        <Button
          className={styles.button}
          icon={null}
          onClick={() => router.push(`/`)}
          style={{
            backgroundColor: "#5669FF",
            padding: "24px 24px",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          Back Home
          <ArrowBlueRight />
        </Button>
      </div>
    </div>
  );
};
