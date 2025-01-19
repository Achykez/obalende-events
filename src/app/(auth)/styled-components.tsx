import { Button, Input } from "@/components";
import { Checkbox } from "antd";
import { styled } from "styled-components";

export const AuthPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: ${({ theme }) =>
    theme.colors.background.light}; // Background for container
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;

export const CenteredDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;

`

export const AuthPageContent = styled.div`
  width: 612px;
  margin: 70px 0px;
  border-radius: 24px;
  padding: 80px 20px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary}; // Card background: ;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.border.default};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AuthPageHeader = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary}; 
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) => getTextStyle({ weight: weights.SemiBold, variant: variants.HEADER4 })};
  @media (max-width: 768px) {
    ${({
      theme: {
        typography: { variants, getTextStyle, weights },
      },
    }) =>
      getTextStyle({ weight: weights.SemiBold, variant: variants.HEADER4 })};
  }
`;

export const Subtitle = styled.p`
  margin-top: 5px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary}; 
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_SMALL })};
`;

export const ResendTokenText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })};
  span {
    cursor: pointer;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.text.green}; // Link color
  }
`;

export const InputsWrap = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin: 40px 0px;
`;

export const AuthPageButton = styled(Button)`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  // Button background
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.tertiary}; // Button text color: ;
  @media (max-width: 768px) {
    height: 48px;
  }
`;

export const AuthPageFlexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ResendTokenFlexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const AuthPageText = styled.p`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary}; 
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })};
  @media (max-width: 768px) {
    ${({
      theme: {
        typography: { variants, getTextStyle, weights },
      },
    }) =>
      getTextStyle({ weight: weights.Medium, variant: variants.BODY_SMALL })};
  }
`;

export const ChekBoxWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
`;

export const StyledCheckbox = styled(Checkbox)`
  span {
    color: ${({ theme }) => theme.colors.text.primary}!important;
  }
`;



export const Box = styled(ChekBoxWrap)`
  text-align: center;
  justify-content: center;
`;

export const FlatButton = styled.button`
  background-color: unset;
  border: none;
  outline: none;
  margin: 0px 3px;
  cursor: pointer;
  text-decoration: underline;
  color: ${({ theme }) =>
    theme.colors.text.success}; // Link button text color: ;
  ${({
    theme: {
      typography: { variants, getTextStyle, weights },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })};
  @media (max-width: 768px) {
    ${({
      theme: {
        typography: { variants, getTextStyle, weights },
      },
    }) =>
      getTextStyle({ weight: weights.Medium, variant: variants.BODY_SMALL })};
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const AuthFlexbox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const NameInput = styled(Input)`
  width: 100%;
  background-color: ${({ theme }) =>
    theme.colors.background.light}; // Input background
  color: ${({ theme }) => theme.colors.text.primary}; // Input text color
  border: 1px solid ${({ theme }) => theme.colors.border.default}; // Input border
`;
