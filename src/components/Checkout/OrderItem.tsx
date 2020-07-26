import * as React from "react";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { MealOrderI } from "../../services/api";
import {
  sprout,
  spacer8,
  spacer12,
  spacer24,
  doveGray,
  alabaster,
  spacer4,
} from "../../styles/tokens";
import { formatCurrencyToPounds } from "../../services/utils";

type OrderItemProps = {
  order: MealOrderI;
};

export const Box = styled.div`
  display: flex;
  margin: ${spacer24} 0;
  flex: 1 1 100%;
  justify-content: space-between;
`;

export const Label = styled.span`
  color: ${doveGray};
  text-align: left;
  padding: ${spacer4};
  width: 40px;
  font-weight: 700;
  font-size: 1.2em;
`;

export const Paragraph = styled.p`
  color: ${doveGray};
  text-align: center;
  margin: 0;
  padding: ${spacer8};
  text-align: left;
  flex: 1 1 100%;
`;

export const PriceCell = styled(Paragraph)`
  width: 50px;
  text-align: right;
  flex: 0;
`;

const OrderItem: FC<OrderItemProps> = ({ order }) => {
  const cost = formatCurrencyToPounds(
    Number(order.count) * Number(order.price)
  );

  return (
    <Box>
      <Label>{order.count}</Label>
      <Paragraph>{order.name}</Paragraph>
      <PriceCell>{cost}</PriceCell>
    </Box>
  );
};

export default OrderItem;
