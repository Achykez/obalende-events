'use client';
import { EyeCloseIcon, EyeIcon } from '@/assets';
import { ComponentPropsWithoutRef, FC, useState } from 'react';
import styled from 'styled-components';

type InputProp = {
  label?: string;
  errorMessage?: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input: FC<InputProp> = ({
  label,
  errorMessage,
  className,
  ...rest
}) => {
  return (
    <Div>
      {label && <Label>{label}</Label>}
      <InputTag
        {...rest}
        className={className}
        $error={!!errorMessage}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Div>
  );
};

export const InputWithIcon: FC<InputProp> = ({
  label,
  errorMessage,
  className,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Div>
      {label && <Label>{label}</Label>}
      <InputContainer className={className}>
        <PasswordInput
          {...rest}
          type={showPassword ? 'text' : 'password'}
          $error={!!errorMessage}
        />
        <EyeIconWrap onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
        </EyeIconWrap>
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Div>
  );
};

const InputContainer = styled.div<{ $error?: boolean }>`
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.colors.background.light};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error.main : theme.colors.border.default};
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.SemiBold, variant: variants.BODY_SMALLER })};
`;

const InputTag = styled.input<{ $error?: boolean }>`
  width: 100%;
  height: 56px;
  border-radius: 16px;
  padding: 5px 15px;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.light};

  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error.main : theme.colors.border.default};
  ${({
    theme: {
      typography: { weights, variants, getTextStyle },
    },
  }) => getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })}
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
`;

const PasswordInput = styled(InputTag)`
  border: none;
  padding: 5px 15px;
  background: ${({ theme }) => theme.colors.background.light};
`;

const EyeIconWrap = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error.main};
  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_SMALLER })};
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
