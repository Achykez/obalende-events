// Updated Button component with refactored colors
import { ButtonLoaderIcon } from '@/assets';
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

type IButton = {
  text: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: Color;
} & ComponentPropsWithoutRef<'button'>;

enum ButtonVariant {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  TERTIARY = 'Tertiary',
  TRANSPARENT = 'Transparent',
  TRANSPARENTSECONDARY = 'TransparentSecondary',
  SUCCESS = 'Success',
  GREEN = 'Green',
}

enum ButtonSize {
  BIG = 'Big',
  MEDIUM = 'Medium',
  SMALL = 'Small',
  FULLWIDTH = 'FullWidth',
}

enum Color {
  WHITE = 'White',
  BLACK = 'Black',
}

const Button: FC<IButton> = ({
  leftIcon,
  rightIcon,
  text,
  isLoading,
  disabled,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  ...rest
}) => {
  return (
    <ButtonStyle
      {...rest}
      $variant={variant}
      size={size}
      role="button"
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ButtonLoaderIcon />
      ) : (
        <>
          {leftIcon && leftIcon}
          {text}
          {rightIcon && rightIcon}
        </>
      )}
    </ButtonStyle>
  );
};

const variantStyles = (
  theme: DefaultTheme,
  variant: ButtonVariant,
  disabled: boolean | undefined
) =>
  ({
    [ButtonVariant.PRIMARY]: css`
      background: ${theme.colors.background.primary};
      color: ${theme.colors.text.primary};
      ${disabled && 'opacity: 0.4;'};
    `,
    [ButtonVariant.SECONDARY]: css`
      background: ${theme.colors.background.secondary};
      color: ${theme.colors.text.secondary};
      ${disabled && 'opacity: 0.4;'};
    `,
    [ButtonVariant.TERTIARY]: css`
      opacity: 50%;
      background: ${theme.colors.background.tertiary};
      color: ${theme.colors.text.tertiary};
    `,
    [ButtonVariant.TRANSPARENT]: css`
      background: transparent;
      border: 1px solid ${theme.colors.border.transparent};
      color: ${theme.colors.text.transparent};
      ${disabled && 'opacity: 0.4;'};
    `,
    [ButtonVariant.TRANSPARENTSECONDARY]: css`
      background: transparent;
      border: 1px solid ${theme.colors.border.secondary};
      color: ${theme.colors.text.secondary};
      ${disabled && 'opacity: 0.4;'};
    `,
    [ButtonVariant.SUCCESS]: css`
      background: ${theme.colors.background.success};
      border: 1px solid ${theme.colors.border.success};
      color: ${theme.colors.text.success};
      ${disabled && 'opacity: 0.4;'};
    `,
    [ButtonVariant.GREEN]: css`
      color: ${theme.colors.text.green};
      background: ${theme.colors.background.green};
      border: 1px solid ${theme.colors.border.green};
    `,
  }[variant]);

const variantSizing = (size: ButtonSize) =>
  ({
    [ButtonSize.FULLWIDTH]: css`
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      font-family: 'Maven Pro', sans-serif;
      padding: 12px 16px 12px 12px;
    `,
    [ButtonSize.BIG]: css`
      width: 164px;
      height: 48px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      font-family: 'Maven Pro', sans-serif;
      padding: 14px, 24px, 14px, 24px;
    `,
    [ButtonSize.MEDIUM]: css`
      width: 149px;
      height: 40px;
      padding: 12px, 24px, 12px, 24px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    `,
    [ButtonSize.SMALL]: css`
      width: 128px;
      height: 32px;
      font-weight: 400;
      letter-spacing: 0.6px;
      font-size: 14px;
      line-height: 16px;
      padding: 8px, 16px, 8px, 16px;
    `,
  }[size]);

type IButtonStyle = {
  $variant: ButtonVariant;
  size: ButtonSize;
};
const ButtonStyle = styled.button<IButtonStyle>`
  border: none;
  outline: none;
  border-radius: 36px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  column-gap: 8px;
  transition: 0.2s ease-in-out;
  font-family: 'Maven Pro', sans-serif;
  ${({ theme, $variant, disabled }) =>
    disabled
      ? variantStyles(theme, ButtonVariant.TERTIARY, disabled)
      : variantStyles(theme, $variant, disabled)};
  ${({ size }) => variantSizing(size)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:active {
    transform: scale(1.08);
  }
`;

export { Button, ButtonSize, ButtonVariant };

export const lightTheme = {
  colors: {
    background: {
      primary: '#66BB6A',
      secondary: '#004D40',
      tertiary: '#81C784',
      success: '#FFFFFF',
      green: '#2E7D32',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
      tertiary: '#FFFFFF',
      transparent: '#FFFFFF',
      success: '#CEDC00',
      green: '#81C784',
    },
    border: {
      transparent: '#FFFFFF',
      secondary: '#006848',
      success: '#CEDC00',
      green: '#81C784',
    },
  },
};

export const darkTheme = {
  colors: {
    background: {
      primary: '#388E3C',
      secondary: '#1B5E20',
      tertiary: '#4CAF50',
      success: '#000000',
      green: '#1B5E20',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#000000',
      tertiary: '#FFFFFF',
      transparent: '#FFFFFF',
      success: '#CEDC00',
      green: '#4CAF50',
    },
    border: {
      transparent: '#FFFFFF',
      secondary: '#004D40',
      success: '#CEDC00',
      green: '#4CAF50',
    },
  },
};
