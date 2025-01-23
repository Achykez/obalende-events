'use client'
import React, { useEffect } from "react";
import styles from "./style.module.css";
import Calender from "@/assets/icons/calender";
import Pin from "@/assets/icons/pin";
import { Button } from "antd";
import ArrowBlueRight from "@/assets/icons/arrow-blue-right";
import CalenderImage from "@/assets/images/Calendar.png"
import LocationImage from "@/assets/images/Location.png"
import Image from "next/image";
import Participants from "../participants";
import axios from "axios";
import testImage from "@/assets/images/image 84.png"

export default function OngoingBody() {

    // useEffect(()=>{
    //     const getParticipants = ()=>{
    //     const response = axios.get('')
    //     }
    // },[])
  return (
    <div className={styles.mainBody}>
    <div className={styles.header}>
      <h2>International Band Music Concert</h2>
    </div>
        <div className={styles.participants}>
            {[1,2,3,4,5,6,7,8,9,10].map((item, index)=>(
                <Participants key={index} name="Tony" NOV={2} image={testImage} alias="tony"/>
            ))}
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
  )
}
