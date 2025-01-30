/* JSX */
import React, { useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import styled from "styled-components";
import { ParticipantsProps } from "./index.types";
import styles from "./style.module.css";
import { AppLogo } from "@/assets";
import CustomModal from "@/components/modal";
import StepsContent from "@/components/stepForm";

export default function Participants(props: ParticipantsProps) {
  const { image, NOV, name, alias } = props;
  const [voted, setVoted] = useState<ParticipantsProps | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className={styles.mainContainer}>
      {!!voted && (
        <CustomModal
          title={`Vote for ${alias}`}
          visible={!!voted}
          onClose={() => setVoted(null)}
          onAction={() => {}}
          noFooter>
          <StepsContent
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            close={() => setVoted(null)}
            dynamicId={voted.id}
          />
        </CustomModal>
      )}
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
          <VoteButton onClick={() => setVoted(props)}>
            Vote for {name}
          </VoteButton>
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
  background-color: #ed141b;
  color: #fff;
  font-size: 16px;
  padding: 15px 24px;
  border-radius: 12px;
  transition: background-color 0.3s;
  align-self: center;

  &:hover {
    background-color: #ff0009;
  }
`;
