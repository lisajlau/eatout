import * as React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { Cookies } from "../../services/constant";
import styled from "styled-components";
import {
  fadeGray,
  alabaster,
  spacer24,
  spacer40,
  sprout,
} from "../../styles/tokens";
import CheckoutContent, { CheckoutContentProps } from "./CheckoutContent";

const Content = styled.div`
  background-color: ${fadeGray};
  padding: ${spacer40} 0;
  min-height: calc(100vh - 100px);
`;

const Checkout: FC<{}> = () => {
  const [basket] = useLocalStorage<CheckoutContentProps>(Cookies.Basket);

  return (
    <Content>
      <div className="container">
        <h4>My order</h4>
        {basket && (
          <CheckoutContent
            orders={basket.orders}
            restaurantId={basket.restaurantId}
          />
        )}
        {!basket && (
          <div>
            Are you lost? <Link to="/">Start ordering</Link>
          </div>
        )}
      </div>
    </Content>
  );
};

export default Checkout;
