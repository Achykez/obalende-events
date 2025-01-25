"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import Location from "@/assets/icons/location";
import Image from "next/image";
import styles from "./styles.module.css";
import { UpcomingProps } from "./index.types";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function UpComingHandler(props: UpcomingProps) {
  const { title, image, location, id, data } = props;
  const router = useRouter();

  const toDetailPage = () => {
    router.push(`/upcoming-events/${id}`);
  };
  return (
    <div className={styles.MainContainer} onClick={toDetailPage}>
      <div className={styles.ImageContainer}>
        <Image
          style={{ borderRadius: "18px" }}
          className={styles.mainImage}
          src={image}
          alt=""
          fill
        />
      </div>
      <div className={styles.TextContainer}>
        <div className={styles.firstTextContainer}>
          <p>{title}</p>
        </div>
        {data.length > 0 && (
          <div className={styles.firstContainer}>
            <div className={styles.attendantsImage}>
              {data
                ?.map((item, index) => (
                  <StyledImage key={index} src={item.image} alt="attendant" />
                ))
                .slice(0, 3)}
            </div>
            {data.length > 3 && (
              <p className={styles.attendanst}>
                <p>+{data.length - 3} More</p>
              </p>
            )}
          </div>
        )}

        <div className={styles.thirdTextContainer}>
          <Location />
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
}

const StyledImage = styled.img``;
