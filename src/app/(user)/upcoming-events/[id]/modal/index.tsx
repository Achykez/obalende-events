import React, { FC } from "react";

import { Button } from "antd";
import styles from "./style.module.css";
import { IParticipant } from "@/redux/api/participants";
import styled from "styled-components";

interface IProps {
  data?: IParticipant[];
  handleShare: () => void;
}

export const DisplayModal: FC<IProps> = ({ data , handleShare}) => {

  return (
    <div className={styles.mainContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.attendantsImage}>
          {data
            ?.map((item, index) => (
              <StyledImage key={index} src={item.image} alt="attendant" />
            ))
            .slice(0, 3)}
        </div>
        {data?.length > 3 && (
          <p className={styles.attendanst}>
            <p>+{data.length - 3} More</p>
          </p>
        )}
      </div>
      <div>
        <Button
        onClick={() => handleShare()}
          style={{
            backgroundColor: "#5669FF",
            padding: "18px 18px",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          Invite
        </Button>
      </div>
    </div>
  );
};

const StyledImage = styled.img`
`
