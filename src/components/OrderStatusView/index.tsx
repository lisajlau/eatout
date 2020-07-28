import * as React from "react";
import { useAsync, useLocalStorage } from "react-use";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import {
  UserI,
  fetchConfirmedOrder,
  ConfirmedOrderI,
  fetchRestaurantDetails,
  RestaurantI,
  updateOrder,
  OrderStatus,
} from "../../services/api";
import { Cookies } from "../../services/constant";
import {
  spacer40,
  fadeGray,
  mineShaft,
  spacer8,
  spacer24,
  alabaster,
} from "../../styles/tokens";
import OrderItem from "../Checkout/OrderItem";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Banner, { BannerType } from "../Banner";
import { formatDateTime } from "../../services/utils";

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacer40};
`;

const Content = styled.div`
  background-color: ${fadeGray};
  padding: ${spacer40} 0;
  min-height: calc(100vh - 100px);
`;

const Label = styled.span`
  color: ${mineShaft};
  margin-right: ${spacer8};
`;
const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${spacer24};
`;
const Cart = styled.div`
  background-color: ${alabaster};
  margin: ${spacer24} 0;
  padding: ${spacer24};
  max-width: 600px;
`;

const OrderStatusView: FC<{}> = () => {
  const [user] = useLocalStorage<UserI>(Cookies.UserLogin);
  const [order, setOrder] = useState<ConfirmedOrderI>(null);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<RestaurantI>(null);
  const { orderId } = useParams();
  const [error, setError] = useState("");
  const fetchData = useAsync(async () => {
    const resp = await fetchConfirmedOrder(orderId);
    if (resp.username === user.username) {
      setIsUser(true);
    }
    setOrder(resp);
    if (resp) {
      const rest = await fetchRestaurantDetails(resp.restaurant_id);
      setRestaurant(rest);
    }
  }, []);

  const onCancel = useCallback(async () => {
    if (order.username === user.username) {
      try {
        const resp = await updateOrder(order.order_id, OrderStatus.Cancelled);
        setOrder(resp);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [order]);

  const onReceived = useCallback(async () => {
    if (order.username === user.username) {
      try {
        const resp = await updateOrder(order.order_id, OrderStatus.Received);
        setOrder(resp);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [order]);

  const ConfirmedOrder = () => {
    if (!order) {
      return <Banner type={BannerType.ERROR} message="Unable to find order" />;
    }
    const updatedAt = formatDateTime(new Date(order.updated_at));
    return (
      <OrderBox>
        <h4>
          <Label>Status:</Label>
          {order.status}
        </h4>
        <h4>
          <Label>{restaurant.name}</Label>
        </h4>
        <h5>Updated at: {updatedAt}</h5>
        <Cart>
          {order.orders.map((order) => (
            <OrderItem order={order} key={order.meal_id} />
          ))}
        </Cart>
        {error && <Banner type={BannerType.ERROR} message={error} />}

        <div>
          {isUser && order.status === OrderStatus.Placed && (
            <button onClick={onCancel}>Cancel order</button>
          )}
          {isUser && order.status === OrderStatus.Delivered && (
            <button onClick={onReceived}>Mark as received</button>
          )}
        </div>
      </OrderBox>
    );
  };

  return (
    <Content>
      <div className="container">
        {fetchData.loading ? (
          <Flexbox>
            <Loader size="100px" />
          </Flexbox>
        ) : fetchData.error ? (
          <Banner message={fetchData.error.message} type={BannerType.ERROR} />
        ) : (
          <ConfirmedOrder />
        )}
      </div>
    </Content>
  );
};

export default OrderStatusView;
