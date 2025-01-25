import { IParticipant } from "@/redux/api/participants";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  padding: 16px;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  margin-bottom: 16px;
  @media (min-width: 600px) {
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  max-width: 300px;
  object-fit: contain;
  max-height: 300px;
  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  @media (min-width: 600px) {
    align-items: flex-start;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

interface ParticipantDetailsProps {
  participant: IParticipant;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  participant,
}) => {
  console.log("WAHALA", participant);

  return (
    <Container>
      <ImageWrapper>
        <StyledImage src={participant.image} alt={participant.name} />
      </ImageWrapper>
      <Details>
        <DetailItem>
          <Label>Name:</Label> {participant.name}
        </DetailItem>
        <DetailItem>
          <Label>Alias:</Label> {participant.alias}
        </DetailItem>
        <DetailItem>
          <Label>Phone Number:</Label> {participant.phoneNumber}
        </DetailItem>
        <DetailItem>
          <Label>Votes:</Label> {participant.votes}
        </DetailItem>
        <DetailItem>
          <Label>Address:</Label> {participant.address}
        </DetailItem>
        <DetailItem>
          <Label>Status:</Label>{" "}
          {participant.suspended ? "Suspended" : "Active"}
        </DetailItem>
      </Details>
    </Container>
  );
};

export default ParticipantDetails;
