import * as React from "react";
import { FC } from "react";
import styled, { css } from "styled-components";
import {
  fadeGray,
  burntSienna,
  starship,
  bostonBlue,
} from "../../styles/tokens";

export enum BannerType {
  WARNING = "Warning",
  ERROR = "Error",
  INFO = "Info",
}

type BannerProps = {
  message: string;
  type: BannerType;
};

const Block = styled.code`
  background-color: ${(props) => props.color};
`;

const getColor = (type) => {
  switch (type) {
    case BannerType.ERROR:
      return burntSienna;
    case BannerType.WARNING:
      return starship;
    case BannerType.INFO:
      return bostonBlue;
    default:
      return fadeGray;
  }
};

const Banner: FC<BannerProps> = ({ message, type }) => {
  let color = getColor(type);
  return (
    <pre>
      <Block color={color}>{message}</Block>
    </pre>
  );
};

export default Banner;
