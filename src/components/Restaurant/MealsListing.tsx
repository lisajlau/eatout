import * as React from "react";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { Meal, Order } from "../../services/api";
import {
  sprout,
  fadeGray,
  spacer8,
  spacer12,
  doveGray,
  alabaster,
  spacer24,
  spacer48,
} from "../../styles/tokens";
import OrderItem from "./OrderItem";

import { formatCurrencyToPounds } from "../../services/utils";

type MealsProps = {
  list: Meal[];
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 300px;
  column-gap: ${spacer24};
  row-gap: ${spacer24};
  margin: ${spacer24} 0;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const Heading = styled.h4`
  margin: ${spacer48} 0 ${spacer8} 0;
`;

const Meal = styled.div`
  background-color: ${alabaster};
  border-bottom: solid 1px ${fadeGray};
  padding: ${spacer12};
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  color: ${doveGray};
  text-align: center;
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

const TotalBillCell = styled.div`
  text-align: center;
  margin: ${spacer24};
  font-size: 40px;
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

const Cart = styled.div`
  background-color: ${alabaster};
  width: 100%;
  margin: 0 ${spacer12};
  padding: ${spacer12};
`;

const CheckoutButton = styled.button`
  background-color: ${sprout};
  width: 100%;
`;

const MealsListing: FC<MealsProps> = ({ list }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalBill, setTotalBill] = useState<number>(0);
  const addToOrder = useCallback(
    (meal) => {
      const existing = orders.findIndex(
        (order) => order.meal_id === meal.meal_id
      );
      let newState;
      if (existing !== -1) {
        newState = orders.map((order) =>
          order.meal_id === meal.meal_id
            ? { ...order, count: Number(order.count) + 1 }
            : order
        );
      } else {
        newState = [
          ...orders,
          {
            meal_id: meal.meal_id,
            count: 1,
            name: meal.name,
            price: meal.price,
          },
        ];
      }
      setOrders(newState);
      const total = newState.reduce(
        (sum, order) => Number(order.price) * Number(order.count) + sum,
        0
      );
      setTotalBill(total);
    },
    [orders]
  );

  const updateOrders = useCallback(
    (mealId, count) => {
      let newState;
      if (Number(count) > 0) {
        newState = orders.map((order) =>
          order.meal_id === mealId ? { ...order, count: Number(count) } : order
        );
      } else {
        newState = orders.filter((order) => order.meal_id !== mealId);
      }
      setOrders(newState);
      const total = newState.reduce(
        (sum, order) => Number(order.price) * Number(order.count) + sum,
        0
      );
      setTotalBill(total);
    },
    [orders]
  );
  return (
    <>
      <Heading>Menu</Heading>

      <Grid>
        <div>
          {list &&
            list.map((meal) => (
              <Meal key={meal.name}>
                <div>
                  <MealTitle>{meal.name}</MealTitle>
                  <MealCell>{meal.description}</MealCell>
                </div>
                <PriceCell>
                  <div>{formatCurrencyToPounds(meal.price)}</div>
                  <div>
                    <Button onClick={() => addToOrder(meal)}>&#43;</Button>
                  </div>
                </PriceCell>
              </Meal>
            ))}
          {list.length === 0 && (
            <Paragraph>There are no meals available</Paragraph>
          )}
        </div>
        <div>
          <Cart>
            <h5>Your basket</h5>
            <div>
              {orders.length > 0 &&
                orders.map((item) => (
                  <OrderItem
                    key={item.meal_id}
                    order={item}
                    onUpdate={updateOrders}
                  />
                ))}
              {orders.length === 0 && <Paragraph>There are no items</Paragraph>}
            </div>
            <div>
              <h5>Subtotal</h5>
              <TotalBillCell>{formatCurrencyToPounds(totalBill)}</TotalBillCell>
            </div>
            <div>
              <CheckoutButton>Checkout</CheckoutButton>
            </div>
          </Cart>
        </div>
      </Grid>
    </>
  );
};

export default MealsListing;
