import { IParticipant } from "@/redux/api/participants";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  justify-content: center;

  @media (min-width: 600px) {
    justify-content: flex-start;
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    max-width: unset;
    max-height: unset;
    flex: 1;
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
  return (
    <Container>
      <ImageWrapper>
        <StyledImage src={participant.image} alt={participant.name} />
        {participant.proof && (
          <>
            <Label>Proof:</Label>
            <StyledImage
              src={participant.proof}
              alt={`${participant.name} Proof`}
            />
          </>
        )}
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
