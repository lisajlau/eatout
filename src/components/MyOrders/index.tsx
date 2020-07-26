import * as React from "react";
import { useAsync, useLocalStorage } from "react-use";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import {
  UserI,
  ConfirmedOrderI,
  fetchAllOrdersByUser,
} from "../../services/api";
import { Cookies } from "../../services/constant";
import {
  spacer40,
  fadeGray,
  mineShaft,
  spacer8,
  spacer24,
  spacer12,
  alabaster,
} from "../../styles/tokens";
import { Link, useHistory } from "react-router-dom";
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
  background-color: ${alabaster};
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${fadeGray};
  padding: ${spacer12};
`;

const Cart = styled.div`
  margin: ${spacer24} 0;
`;

const MyOrders: FC<{}> = () => {
  const [user] = useLocalStorage<UserI>(Cookies.UserLogin);
  const [orders, setOrders] = useState<ConfirmedOrderI[]>(null);
  const [error, setError] = useState("");
  const history = useHistory();
  const fetchData = useAsync(async () => {
    const resp = await fetchAllOrdersByUser(user.username);
    setOrders(resp);
  }, []);

  if (!user) {
    history.push("/login?from=checkout");
  }

  const ConfirmedOrder = () => {
    if (!orders) {
      return (
        <Banner type={BannerType.INFO} message="Unable to find any orders" />
      );
    }
    return (
      <div>
        <h4>My Orders</h4>
        <Cart>
          {orders.map((order) => (
            <OrderBox key={order.order_id}>
              <div>{formatDateTime(new Date(order.updated_at))}</div>
              <div>{order.status}</div>
              <div>{order.order_id}</div>
              <div>
                <Link to={`/confirmed/order/${order.order_id}`}>
                  <button>View</button>
                </Link>
              </div>
            </OrderBox>
          ))}
        </Cart>
        {error && <Banner type={BannerType.ERROR} message={error} />}
      </div>
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

export default MyOrders;
