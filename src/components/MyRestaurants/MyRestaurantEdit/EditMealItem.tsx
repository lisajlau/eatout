import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { MealI } from "../../../services/api";
import {
  sprout,
  spacer24,
  doveGray,
  alabaster,
  fadeGray,
  spacer12,
} from "../../../styles/tokens";
import { formatCurrencyToPounds } from "../../../services/utils";

type EditMealItemProps = {
  meal: MealI;
  onUpdate: (meal: string) => void;
};

const Meal = styled.div`
  background-color: ${alabaster};
  border-bottom: solid 1px ${fadeGray};
  padding: ${spacer12};
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: top;
  padding: ${spacer24};
`;

const MealTitle = styled.h5`
  width: 150px;
`;

const MealCell = styled.div`
  color: ${doveGray};
  width: 400px;
`;

const PriceCell = styled.div`
  width: 80px;
`;

const EditMealItem: FC<EditMealItemProps> = ({ meal, onUpdate }) => {
  return (
    <div>
      <Meal>
        <MealTitle>{meal.name}</MealTitle>
        <MealCell>{meal.description}</MealCell>
        <PriceCell>{formatCurrencyToPounds(meal.price)}</PriceCell>
        <button onClick={() => onUpdate(meal.meal_id)}>Edit</button>
      </Meal>
      <div></div>
    </div>
  );
};

export default EditMealItem;
