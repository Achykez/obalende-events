/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "./styles.module.css";
import Calender from "@/assets/icons/calender";
import Pin from "@/assets/icons/pin";
import { Button } from "antd";
import ArrowBlueRight from "@/assets/icons/arrow-blue-right";
import CalenderImage from "@/assets/images/Calendar.png"
import LocationImage from "@/assets/images/Location.png"
import Image from "next/image";
export default function KarokeBody() {
  return (
    <div className={styles.mainBody}>
      <div className={styles.header}>
        <h2>International Band Music Concert</h2>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.timeContainer}>
          <div className={styles.calenderIcon}>
            <Image src={CalenderImage} alt="calender" width={30} height={30}/>
          </div>
          <div>
            <h2>14 December, 2021</h2>
            <p>Tuesday, 4:00PM - 9:00PM</p>
          </div>
        </div>
        <div className={styles.timeContainer}>
          <div className={styles.calenderIcon}>
          <Image src={LocationImage} alt="calender" width={30} height={30}/>
          </div>
          <div>
            <h2>Gala Convention Center</h2>
            <p>36 Guild Street London, UK </p>
          </div>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionHeader}>
          <h2>About Event</h2>
        </div>
        <div>
          <p className={styles.work}>
            Enjoy your favorite dishe and a lovely your friends and family and
            have a great time. Food from local food trucks will be available for
            purchase. Read More...
          </p>
        </div>
        <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}} >
          <Button
            className={styles.button}
            icon={null} 
            style={{
                backgroundColor:"#5669FF",
                padding:"24px 24px",
                color:"#fff",
                fontSize:"16px",
                cursor:"pointer",
                borderRadius:"12px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}
          >
           Click To Participate
            <ArrowBlueRight /> 
          </Button>
        </div>
      </div>
    </div>
  );
}
