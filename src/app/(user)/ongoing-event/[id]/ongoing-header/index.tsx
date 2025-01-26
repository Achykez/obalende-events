"use client";
import React from "react";
import styles from "./styles.module.css";
import ArrowLeft from "@/assets/icons/arrowLeft";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EventsResponse } from "@/redux/api/events";
import { AppLogo } from "@/assets";


export default function OngoingHeader({data} : {data: EventsResponse}) {
      const router = useRouter(); 
    
      const backTOPrev = () => {
        router.back();
      };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.mainFirstContainer}>
          <div onClick={backTOPrev} style={{ cursor: "pointer" }}>
            <ArrowLeft />
          </div>
          {/* <div>
            <p>Ongoing Details</p>
          </div> */}
        </div>
        <div className={styles.absoluteImage}>
          <Image src={data?.event.image ?? AppLogo} alt="background-image" fill />
          <div
            style={{
              position:"absolute",
              inset: 0,
              background:"linear-gradient(180deg, rgba(255, 255, 255, 0.00) 33.2%, rgba(0, 0, 0, 0.65) 73.83%)",
            }}
          />
        </div>
      </div>
    </>
  )
}
