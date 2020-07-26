import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { MealI } from "../../services/api";
import {
  sprout,
  spacer8,
  doveGray,
  alabaster,
  fadeGray,
  spacer12,
} from "../../styles/tokens";
import { formatCurrencyToPounds } from "../../services/utils";

type MealItemProps = {
  meal: MealI;
  onUpdate: (meal: MealI) => void;
};

const Meal = styled.div`
  background-color: ${alabaster};
  border-bottom: solid 1px ${fadeGray};
  padding: ${spacer12};
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const MealTitle = styled.h5`
  margin: ${spacer8};
`;

const MealCell = styled.div`
  margin: ${spacer8};
  color: ${doveGray};
`;

const PriceCell = styled.div`
  text-align: center;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  color: ${sprout};
  border-color: ${sprout};
  font-size: 18px;
  border-radius: 99px;
  width: 44px;
  height: 44px;
  margin: ${spacer8};
  padding: 0;
  background-color: ${alabaster};
`;

const MealItem: FC<MealItemProps> = ({ meal, onUpdate }) => {
  return (
    <Meal>
      <div>
        <MealTitle>{meal.name}</MealTitle>
        <MealCell>{meal.description}</MealCell>
      </div>
      <PriceCell>
        <div>{formatCurrencyToPounds(meal.price)}</div>
        <div>
          <Button onClick={() => onUpdate(meal)}>&#43;</Button>
        </div>
      </PriceCell>
    </Meal>
  );
};

export default MealItem;
