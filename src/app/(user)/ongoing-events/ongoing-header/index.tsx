"use client";
import React from "react";
import styles from "./styles.module.css";
import ArrowLeft from "@/assets/icons/arrowLeft";
import BackgroundImage from "@/assets/images/image 77.png";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function OngoingHeader() {
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
          <div>
            <p>ongoing Details</p>
          </div>
        </div>
        <div className={styles.absoluteImage}>
          <Image src={BackgroundImage} alt="background-image" fill />
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
