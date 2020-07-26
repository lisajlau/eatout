import * as React from "react";
import { FC, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import styled from "styled-components";
import { MealI, MealOrderI } from "../../services/api";
import { Cookies } from "../../services/constant";
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
import MealItem from "./MealItem";

import { formatCurrencyToPounds } from "../../services/utils";
import Banner, { BannerType } from "../Banner";

type MealsProps = {
  list: MealI[];
  restaurantId: string;
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

const Paragraph = styled.p`
  color: ${doveGray};
  text-align: center;
`;

const TotalBillCell = styled.div`
  text-align: center;
  margin: ${spacer24};
  font-size: 40px;
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

const MealsListing: FC<MealsProps> = ({ list, restaurantId }) => {
  const history = useHistory();
  const [orders, setOrders] = useState<MealOrderI[]>([]);
  const [totalBill, setTotalBill] = useState<number>(0);
  const [error, setError] = useState("");
  const [basket, setBasket] = useLocalStorage<{
    restaurantId: string;
    orders: MealOrderI[];
  }>(Cookies.Basket);
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

  const onCheckout = useCallback(() => {
    if (restaurantId && orders.length > 0) {
      setBasket({
        restaurantId,
        orders,
      });
      history.push("/checkout");
    }
    setError("Something went wrong! Please try again");
  }, [orders]);

  React.useEffect(() => {
    if (basket && basket.restaurantId === restaurantId) {
      setOrders(basket.orders);
    }
  }, []);

  return (
    <>
      <Heading>Menu</Heading>
      {error && <Banner type={BannerType.ERROR} message={error} />}
      <Grid>
        <div>
          {list &&
            list.map((meal) => (
              <MealItem meal={meal} onUpdate={addToOrder} key={meal.name} />
            ))}
          {list.length === 0 && (
            <Paragraph>There are no meals available</Paragraph>
          )}
        </div>
        <div>
          <Cart>
            <h4>My order</h4>
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
              <h5>Total</h5>
              <TotalBillCell>{formatCurrencyToPounds(totalBill)}</TotalBillCell>
            </div>
            <div>
              <CheckoutButton onClick={onCheckout}>Checkout</CheckoutButton>
            </div>
          </Cart>
        </div>
      </Grid>
    </>
  );
};

export default MealsListing;
