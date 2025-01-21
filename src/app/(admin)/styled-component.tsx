import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { styled } from "styled-components";

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.light};
`;
export const Question = styled.p`
  text-align: center;
  margin: 82px 20px;
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({
      weight: weights.Regular,
      variant: variants.HEADING3,
    })}
  color: ${({ theme }) => theme.colors.background.green[900]};
`;
const OptionButton = styled(Link)`
  border-radius: 24px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 48px 32px 48px;
  border: 1px solid rgba(221, 221, 221, 0.87);
  background: #fafafa;
  row-gap: 24px;
  box-shadow: 0px 2px 4px 0px rgba(33, 41, 39, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  height: fit-content;
  z-index: 1;
  &:active {
    transform: scale(1.08);
  }
`;
const OptionImage = styled(Image)``;
const OptionText = styled.p`
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({
      weight: weights.SemiBold,
      variant: variants.HEADER6,
    })}
  color: ${({ theme }) => theme.colors.background.green};
`;
export const Option: FC<{
  image: StaticImageData;
  alt: string;
  text: string;
  link?: string;
}> = ({ image, alt, text, link = '' }) => {
  return (
    <OptionButton href={link}>
      <OptionImage width={208} height={208} src={image} alt={alt} />
      <OptionText>{text}</OptionText>
    </OptionButton>
  );
};

export const OptionsContainer = styled.div`
  display: flex;
  column-gap: 18px;
  align-self: center;
  margin-bottom: 80px;
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 30px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    row-gap: 30px;
  }
`;

export const InfoContainer = styled.div`
  border-radius: 8px;
  align-self: center;
  margin-bottom: 156px;
  padding: 16px 12px;
  justify-content: center;
  display: flex;
  align-items: center;
  column-gap: 8px;
  border: 1px solid #ddd;
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({
      weight: weights.Regular,
      variant: variants.HEADER5,
    })}
  @media screen and (max-width: 500px) {
    margin-inline: 20px;
  }
`;
