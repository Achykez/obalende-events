/* JSX */
import React from "react";
import { Button } from "antd";
import Image from "next/image";
import styled from "styled-components";
import { ParticipantsProps } from "./index.types";
import styles from "./style.module.css";
import { AppLogo } from "@/assets";

export default function Participants(props: ParticipantsProps) {
  const { image, NOV, name, alias } = props;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.ImageContainer}>
        <StyledImage src={image ?? AppLogo} alt={name} fill />
      </div>
      <div className={styles.DetailsContainer}>
        <h2 className={styles.header}>{name}</h2>
        <AliasWrapper>
          {" "}
          <p className="bold">A.K.A:</p> <p className="">{alias}</p>
        </AliasWrapper>
        <VoteContainer>
          <span className="flex">
            {" "}
            <p className="bold">Votes:</p> <p> {NOV}</p>
          </span>
          <VoteButton>Vote for {name}</VoteButton>
        </VoteContainer>
      </div>
    </div>
  );
}

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const AliasWrapper = styled.span`
  font-size: 16px;
  color: #6b7280;
  display: flex;
  gap: 4px;
  .bold {
    font-weight: 700;
  }
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;

  .bold {
    font-weight: 700;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const VoteButton = styled(Button)`
  background-color: #5669ff;
  color: #fff;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 12px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4056d6;
  }
`;
