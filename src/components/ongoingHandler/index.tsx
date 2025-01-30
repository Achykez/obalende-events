"use client";
import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Location from "@/assets/icons/location";
import { useRouter } from "next/navigation";
import { EventsResponse } from "@/redux/api/events";
import styled from "styled-components";
import { WEBSITE_DETAILS } from "@/config";

const OngoingHandler = forwardRef(function OngoingHandler(
  { data }: { data: EventsResponse },
  ref: React.Ref<HTMLDivElement>
) {
  const router = useRouter();

  const toDetailPage = () => {
    
    router.push(`/ongoing-event/${data.event._id}`);
  };

  return (
    <div ref={ref} className={styles.MainContainer} onClick={toDetailPage}>
      <div className={styles.ImageContainer}>
        <Image
          style={{ borderRadius: "18px" }}
          className={styles.mainImage}
          src={data?.event.image ?? ""}
          alt=""
          fill
        />
      </div>
      <div className={styles.TextContainer}>
        <div className={styles.firstTextContainer}>
          <p>{data?.event.name}</p>
        </div>
        {data?.participants.length > 0 && (
          <div className={styles.firstContainer}>
            <div className={styles.attendantsImage}>
              {data?.participants
                ?.map((item, index) => (
                  <StyledImage key={index} src={item.image} alt="attendant" />
                ))
                .slice(0, 3)}
            </div>
            {data?.participants.length > 3 && (
              <p className={styles.attendanst}>
                <p>+{data.participants.length - 3} More</p>
              </p>
            )}
          </div>
        )}
        <div className={styles.thirdTextContainer}>
          <Location />
          <p>{WEBSITE_DETAILS.address} </p>
        </div>
      </div>
    </div>
  );
});

export default OngoingHandler;

const StyledImage = styled.img``;
