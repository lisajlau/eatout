import * as React from "react";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { useAsync } from "react-use";
import {
  doveGray,
  spacer40,
  fadeGray,
  alabaster,
  spacer24,
} from "../../../styles/tokens";
import { useParams, Link, useHistory } from "react-router-dom";
import Loader from "../../Loader";
import {
  RestaurantI,
  fetchRestaurantDetails,
  ConfirmedOrderI,
  getAllOrderByRestaurant,
  OrderStatus,
  updateOrder,
  getAllBlockedByRestaurant,
  blockUserForRestaurant,
} from "../../../services/api";
import EditMealItem from "./EditMealItem";
import Banner, { BannerType } from "../../Banner";
import { formatDateTime } from "../../../services/utils";

const OrderStatusFlow = {
  [OrderStatus.Placed]: OrderStatus.Processing,
  [OrderStatus.Processing]: OrderStatus.InRoute,
  [OrderStatus.InRoute]: OrderStatus.Delivered,
  [OrderStatus.Delivered]: OrderStatus.Received,
  [OrderStatus.Cancelled]: "",
};

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

const Paragraph = styled.p`
  color: ${doveGray};
  margin-bottom: 2px;
`;

const Spacer = styled.div`
  height: ${spacer40};
`;

const OrderBox = styled.div`
  display: flex;
  background-color: ${alabaster};
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${fadeGray};
  padding: ${spacer24};
`;

const MyRestaurantsEdit: FC<{}> = () => {
  const history = useHistory();
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantI>(null);
  const [orders, setOrders] = useState<ConfirmedOrderI[]>(null);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [blockedUserInput, setBlockedUserInput] = useState<string>("");
  const [error, setError] = useState("");
  const fetchData = useAsync(async () => {
    const resp = await fetchRestaurantDetails(restaurantId);
    setRestaurant(resp);
    const orderResp = await getAllOrderByRestaurant(restaurantId);
    setOrders(orderResp);
    const blockedResp = await getAllBlockedByRestaurant(restaurantId);
    setBlockedUsers(blockedResp);
  }, []);

  const onUpdate = useCallback(
    async (order_id, status) => {
      try {
        const resp = await updateOrder(order_id, status);
        const updated = orders.map((order) =>
          order.order_id === resp.order_id
            ? { ...order, status: resp.status }
            : order
        );
        setOrders(updated);
      } catch (err) {
        setError(err.message);
      }
    },
    [orders]
  );

  const onAddMeal = useCallback(() => {
    history.push(`/myrestaurant/${restaurantId}/meals/add`);
  }, [restaurantId]);

  const onEditMeal = useCallback(
    (mealId: string) => {
      history.push(`/myrestaurant/${restaurantId}/meals/${mealId}`);
    },
    [restaurantId]
  );
  const handleChange = useCallback((e) => {
    let value = e.target.value;
    setBlockedUserInput(value);
  }, []);
  const blockUser = useCallback(
    async (e) => {
      await blockUserForRestaurant(restaurantId, blockedUserInput);
      setBlockedUsers([...blockedUsers, blockedUserInput]);
      setBlockedUserInput("");
    },
    [blockedUsers, blockedUserInput]
  );
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
          <>
            {error && (
              <Banner
                message={fetchData.error.message}
                type={BannerType.ERROR}
              />
            )}
            <h3>{restaurant.name}</h3>
            <Paragraph>{restaurant.description}</Paragraph>
            <Paragraph>Address: {restaurant.address}</Paragraph>

            <Spacer />

            <h4>Orders</h4>
            {orders.map((order) => (
              <OrderBox key={order.order_id}>
                <div>
                  {OrderStatusFlow[order.status] &&
                    OrderStatusFlow[order.status] !== OrderStatus.Received && (
                      <button
                        className="button-primary"
                        onClick={() =>
                          onUpdate(
                            order.order_id,
                            OrderStatusFlow[order.status]
                          )
                        }
                      >
                        {OrderStatusFlow[order.status]}
                      </button>
                    )}
                </div>
                <div>{order.status}</div>
                <div>{formatDateTime(new Date(order.updated_at))}</div>
                <div>{order.order_id}</div>
                <div>
                  <Link to={`/confirmed/order/${order.order_id}`}>
                    <button>View</button>
                  </Link>
                </div>
              </OrderBox>
            ))}
            <Spacer />
            <h4>Menu</h4>
            <button onClick={onAddMeal} className="button-primary">
              Add meal
            </button>
            {restaurant.meals &&
              restaurant.meals.length > 0 &&
              restaurant.meals.map((meal) => (
                <EditMealItem
                  key={meal.meal_id}
                  meal={meal}
                  onUpdate={(mealId) => onEditMeal(mealId)}
                />
              ))}

            <Spacer />
            <h4>Blocked</h4>
            <Paragraph>{blockedUsers.join(", ")}</Paragraph>
            <Paragraph>
              <input
                type="text"
                placeholder="Block username"
                value={blockedUserInput}
                onChange={handleChange}
              />
              <button onClick={blockUser}>Add</button>
            </Paragraph>
          </>
        )}
      </div>
    </Content>
  );
};

export default MyRestaurantsEdit;
