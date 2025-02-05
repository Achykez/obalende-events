"use client";
import React, { FC } from "react";
import styles from "./styled.module.css";
import { Button } from "antd";
import ArrowBlueRight from "@/assets/icons/arrow-blue-right";
import Participants from "../participants";
import { IParticipant } from "@/redux/api/participants";
import { EventsResponse } from "@/redux/api/events";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IProps {
  eventDetails: EventsResponse | null;
  winner: IParticipant | null;
  participantsData: IParticipant[];
}

export const ClosedEventBody: FC<IProps> = ({
  eventDetails,
  winner,
  participantsData,
}) => {
  const router = useRouter();

  return (
    <div className={styles.mainBody}>
      <div className={styles.header}>
        <h2>{eventDetails?.event.name}</h2>
        {winner && (
          <div className={styles.winnerContainer}>
            <h3>Winner</h3>
            <div className={styles.winnerCard}>
              <Image
                src={winner.image}
                alt={winner.name}
                width={100}
                height={100}
                className={styles.winnerImage}
              />
              <h4>{winner.name}</h4>
              <p>{winner.alias}</p>
              <p>Votes: {winner.totalVotes}   👑 </p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.participants}>
        {participantsData
          ?.filter((item) => !item.suspended)
          .map((item, index) => (
            <Participants
              key={index}
              name={item.name}
              NOV={item.totalVotes ?? 0}
              image={item.image}
              alias={item.alias}
              id={item._id}
              isClosed
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
            backgroundColor: "#ed141b",
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