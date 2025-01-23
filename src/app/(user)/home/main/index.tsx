import React from "react";
import UpComingHandler from "@/components/upcomingHandler";
import styles from "./main.module.css";
import { upComingArray } from "@/components/constants/data";
import OngoingHandler from "@/components/ongoingHandler";

export default function Main() {
  return (
    <div>
          <div className={styles.mainHeaderContainer}>
        <h2>Ongoing Events</h2>
      </div>
      <div
        className={styles.mainBodyContainer}
        style={{
          display: "flex",
          overflow: "scroll",
          alignItems: "center",
          gap: "20px",
          padding:"10px"
        }}
      >
        <OngoingHandler/>
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
          padding:"10px"
        }}
      >
        {upComingArray.map((Item, index) => (
          <UpComingHandler
            key={index}
            title={Item.title}
            number={Item.number}
            location={Item.location}
            image={Item.image}
          />
        ))}
      </div>
  
    </div>
  );
}
