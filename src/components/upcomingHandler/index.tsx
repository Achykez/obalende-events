"use client";
import React from "react";
import Location from "@/assets/icons/location";
import Image from "next/image";
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
    <CardContainer onClick={toDetailPage}>
      <ImageWrapper>
        <StyledImage src={image} alt="Event" fill />
      </ImageWrapper>
      <TextContainer>
        <Title>{title}</Title>
        {data.length > 0 && (
          <AttendantsContainer>
            <AttendantsImages>
              {data
                .slice(0, 3)
                .map((item, index) => <AttendantImage key={index} src={item.image} alt="attendant" />)}
            </AttendantsImages>
            {data.length > 3 && <MoreAttendants>+{data.length - 3} More</MoreAttendants>}
          </AttendantsContainer>
        )}
        <LocationContainer>
          <Location />
          <LocationText>{location}</LocationText>
        </LocationContainer>
      </TextContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 97%;
  padding: 12px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0px 4px 15px rgba(80, 85, 136, 0.2);
  margin-bottom: 16px;
  cursor: pointer;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;

  &:active {
    transform: scale(0.97);
    box-shadow: 0px 4px 20px rgba(80, 85, 136, 0.3);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 140px;
  border-radius: 18px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  border-radius: 18px;
  transition: transform 0.3s ease-in-out;

  ${CardContainer}:active & {
    transform: scale(1.05);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding: 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const AttendantsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AttendantsImages = styled.div`
  display: flex;
`;

const AttendantImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-left: -5px;

  &:first-child {
    margin-left: 0;
  }
`;

const MoreAttendants = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #555;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LocationText = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #2b2849;
`;
