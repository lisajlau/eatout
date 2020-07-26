import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import { useHistory } from "react-router-dom";
import { Cookies } from "../../services/constant";
import styled from "styled-components";
import { MealOrderI, UserI, placeOrder } from "../../services/api";
import OrderItem, { Box, Label, Paragraph, PriceCell } from "./OrderItem";
import {
  fadeGray,
  alabaster,
  spacer24,
  spacer40,
  sprout,
} from "../../styles/tokens";
import { formatCurrencyToPounds } from "../../services/utils";
import Banner, { BannerType } from "../Banner";

const Cart = styled.div`
  background-color: ${alabaster};
  padding: ${spacer24};
  max-width: 600px;
`;

const Button = styled.button`
  background-color: ${sprout};
`;

export type CheckoutContentProps = {
  orders: MealOrderI[];
  restaurantId: string;
};

const CheckoutContent: FC<CheckoutContentProps> = ({
  orders,
  restaurantId,
}) => {
  const [, , removeBasket] = useLocalStorage<CheckoutContentProps>(
    Cookies.Basket
  );
  const [user] = useLocalStorage<UserI>(Cookies.UserLogin);
  const history = useHistory();
  const [error, setError] = useState("");

  const confirmOrder = useCallback(async () => {
    try {
      const resp = await placeOrder({
        orders,
        username: user.username,
        restaurant_id: restaurantId,
      });
      removeBasket();
      history.push(`/confirmed/order/${resp.order_id}`);
    } catch (e) {
      setError(e.message);
    }
  }, [orders]);

  if (!user) {
    history.push("/login?from=checkout");
  }

  const totalBill = useMemo(
    () =>
      orders &&
      orders.reduce(
        (sum, order) => Number(order.price) * Number(order.count) + sum,
        0
      ),
    [orders]
  );

  return (
    <Cart>
      {error && <Banner type={BannerType.ERROR} message={error} />}
      <Box>
        <Label style={{ fontSize: "1em" }}></Label>
        <Paragraph style={{ fontWeight: 700 }}>Name</Paragraph>
        <PriceCell style={{ fontWeight: 700 }}>Price</PriceCell>
      </Box>
      {orders.map((order) => (
        <OrderItem order={order} key={order.meal_id} />
      ))}
      <Box>
        <Label></Label>
        <Paragraph style={{ fontWeight: 700 }}>Subtotal</Paragraph>
        <PriceCell style={{ fontWeight: 700 }}>
          {formatCurrencyToPounds(totalBill)}
        </PriceCell>
      </Box>
      <Button onClick={confirmOrder}>Confirm and pay</Button>
    </Cart>
  );
};

export default CheckoutContent;
