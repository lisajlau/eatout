import * as React from "react";
import { FC, useState } from "react";
import { useAsync } from "react-use";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { RestaurantI, fetchRestaurantDetails } from "../../services/api";
import Banner, { BannerType } from "../Banner";
import { spacer40, fadeGray, doveGray } from "../../styles/tokens";
import MealsListing from "./MealsListing";
import Loader from "../Loader";

const Content = styled.div`
  background-color: ${fadeGray};
  padding: ${spacer40} 0;
  min-height: calc(100vh - 100px);
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacer40};
`;

const Paragraph = styled.p`
  color: ${doveGray};
  margin-bottom: 2px;
`;

const Restaurant: FC<{}> = () => {
  const [restaurant, setRestaurant] = useState<RestaurantI>(null);
  const { id } = useParams();
  const fetchData = useAsync(async () => {
    const resp = await fetchRestaurantDetails(id);
    setRestaurant(resp);
  }, []);

  const showRestaurant = () => {
    if (!restaurant) {
      return (
        <Flexbox>
          <p>Unable to find restaurant</p>
        </Flexbox>
      );
    }
    return (
      <>
        <h3>{restaurant.name}</h3>
        <Paragraph>{restaurant.description}</Paragraph>
        <Paragraph>Address: {restaurant.address}</Paragraph>
        {restaurant.meals && restaurant.meals.length > 0 && (
          <MealsListing
            list={restaurant.meals}
            restaurantId={restaurant.restaurant_id}
          />
        )}
      </>
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
          showRestaurant()
        )}
      </div>
    </Content>
  );
};

export default Restaurant;
