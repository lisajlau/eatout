import * as React from "react";
import { FC } from "react";
import styled, { keyframes, StyledFunction } from "styled-components";
import { bostonBlue, doveGray } from "../../styles/tokens";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

interface LoaderProps {
  size?: string;
}

const LoadingGif = styled.div<LoaderProps>`
  border: 16px solid ${doveGray}; /* Light grey */
  border-top: 16px solid ${bostonBlue}; /* Blue */
  border-radius: 50%;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  animation: ${spin} 2s linear infinite;
`;

const Loader: FC<LoaderProps> = ({ size = "25px" }) => {
  return <LoadingGif size={size} />;
};

export default Loader;
