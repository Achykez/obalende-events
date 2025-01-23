/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import styled, { keyframes } from "styled-components";

// Define animations
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const flameFlicker = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
  background-color: ${({theme}) => theme.colors.background.light};
  width: 100%;
  height: 100dvh;
  font-family: 'OregonDry', sans-serif;
  background-color: transparent;
`;

const ObalendeText = styled.div`
  font-size: 64px;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const EnuguText = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: red;
  margin-top: -10px;
`;

const Letter = styled.span<{ $delay: number }>`
  display: inline-block;
  animation: ${bounce} 1s infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

// const FlameIcon = styled.span`
//   display: inline-block;
//   color: red;
//   font-size: 48px;
//   margin-left: -10px;
//   animation: ${flameFlicker} 0.6s infinite;
// `;

// Flame SVG


export const PageLoader: React.FC = () => {
  const obalendeLetters = ["o", "b", "a", "l", "e", "n", "d", "e"];

  return (
    <Container>
      <ObalendeText>
        {obalendeLetters.map((letter, index) => (
          <Letter key={index} $delay={index * 0.1}>
            {letter === "d" ? (
              <>
                d
             
              </>
            ) : (
              letter
            )}
          </Letter>
        ))}
      </ObalendeText>
      <EnuguText>Enugu</EnuguText>
    </Container>
  );
};

// export default AnimatedLogo;
