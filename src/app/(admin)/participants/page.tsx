"use client";

import { FC } from "react";
import styled from "styled-components";
import ParticipantsTable from "./components/searchTable";
import { Button, Header } from "@/components";
import { useRouter } from "next/navigation";
import { AddIcon } from "@/assets";

type CardProp = {
  title: string;
  value: string;
  subTitle: string;
  subTitleValue: string;
};

const Card: FC<CardProp> = ({ title, value, subTitle, subTitleValue }) => {
  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      <SubTitle>
        {subTitle}
        <SubTitleValue>{subTitleValue}</SubTitleValue>
      </SubTitle>
    </CardWrapper>
  );
};

export default function Participants() {
  const router = useRouter();
  return (
    <PageWrapper>
      <Header title="Participants" websiteUrl="Participants for " />
      <Content>
        <CardsWrapper>
          <Card
            title="Active Participants"
            value="0"
            subTitle="How participants are  Active"
            subTitleValue=""
          />
          <Card
            title="Inactive Participant"
            value="0"
            subTitle="Suspended participants"
            subTitleValue=""
          />
          <Card
            title="Deleted Participant"
            value="0"
            subTitle="Deleted participants"
            subTitleValue=""
          />
        </CardsWrapper>
        <ButtonWrapper>
          <StyledButtons text="Add to Upcoming Event" disabled />
          <StyledButtons
            onClick={() => router.push("/participants/create")}
            text="Add Participants"
            leftIcon={<AddIcon />}
          />
        </ButtonWrapper>

        <BottomWrapper>
          <ParticipantsTable />
        </BottomWrapper>
      </Content>
    </PageWrapper>
  );
}

// const PageWrapper = styled.div`
//   width: 100%;
//   height: 100vh;
//   overflow-y: scroll;
// `;

const ButtonWrapper = styled.div`
  display: flex;
  width: fit-content;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 8px;
`;

const StyledButtons = styled(Button)`
  width: fit-content;
  padding: 10px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  border-radius: 8px;
  svg {
    width: 22px;
    height: 22px;
    stroke: ${({theme}) => theme.colors.text.tertiary}
  }
`;
const Content = styled.div`
  padding: 24px 16px;
  @media (min-width: 768px) {
    padding: 24px 80px 0px 35px;
  }
`;

// const CardsWrapper = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//   gap: 16px;
//   overflow-x: auto;
//   padding-bottom: 16px;

//   @media (min-width: 768px) {
//     justify-content: space-between;
//     flex-wrap: wrap;
//     overflow-x: unset;
//   }
// `;

// const CardWrapper = styled.div`
//   border-radius: 15px;
//   background: ${({ theme }) => theme.colors.background.light};
//   box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08),
//     0px 0px 0px 1px rgba(0, 0, 0, 0.08);
//   width: 100%;
//   max-width: 300px;
//   height: 144px;
//   padding: 16px;
// `;

const CardTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
`;

const CardValue = styled.p`
  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) => getTextStyle({ weight: weights.Medium, variant: variants.HEADER3 })};
`;

const SubTitle = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.neutral[500]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
`;

const SubTitleValue = styled.p`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.neutral[900]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_MEDIUM })};
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 27px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-color: #d6d6d8 transparent;
  align-items: center;
  height: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Ensure Cards take appropriate width */
  > div {
    flex: 0 0 auto; /* Prevent cards from shrinking */
  }
`;

const CardWrapper = styled.div`
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.background.light};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08),
    0px 0px 0px 1px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 300px;
  height: 144px;
  padding: 16px;

  @media (min-width: 768px) {
    width: calc(25% - 16px); /* Four cards per row */
  }

  @media (min-width: 1024px) {
    width: calc(20% - 16px); /* Five cards per row if space allows */
  }
`;

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px 16px;
  }
`;
