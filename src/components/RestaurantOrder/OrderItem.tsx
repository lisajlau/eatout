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
  spacer48,
} from "../../styles/tokens";
import { formatCurrencyToPounds } from "../../services/utils";

type OrderItemProps = {
  order: MealOrderI;
  onUpdate: (mealId: string, count: number) => void;
};

const Box = styled.div`
  display: flex;
  margin: ${spacer24} 0;
  flex: 1 1 100%;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  color: ${doveGray};
  text-align: center;
  margin: 0;
  padding: ${spacer8};
  text-align: left;
  flex: 1 1 100%;
`;

const PriceCell = styled(Paragraph)`
  width: 40px;
  text-align: right;
  flex: 0;
`;

const OrderItem: FC<OrderItemProps> = ({ order, onUpdate }) => {
  const cost = formatCurrencyToPounds(
    Number(order.count) * Number(order.price)
  );

  const onCountChange = useCallback(
    (e) => {
      onUpdate(order.meal_id, e.target.value);
    },
    [order.count, onUpdate]
  );

  return (
    <Box>
      <select id="number" value={order.count} onChange={onCountChange}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
      </select>
      <Paragraph>{order.name}</Paragraph>
      <PriceCell>{cost}</PriceCell>
    </Box>
  );
};

export default OrderItem;
