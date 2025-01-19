import { ButtonLoaderIcon } from '@/assets';
import React from 'react';
import { keyframes, styled } from 'styled-components';

export const ButtonLoader = () => {
  return (
    <IconWrap>
      <ButtonLoaderIcon />
    </IconWrap>
  );
};
const rotate = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;
const IconWrap = styled.div`
  display: flex;
  animation: ${rotate} 0.8s linear infinite;
`;
