import * as React from "react";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Restaurant, fetchRestaurantDetails } from "../../services/api";
import Banner, { BannerType } from "../Banner";
import { spacer40, fadeGray, doveGray } from "../../styles/tokens";
import MealsListing from "./MealsListing";

const Content = styled.nav`
  background-color: ${fadeGray};
  padding: ${spacer40} 0;
  min-height: 100vh;
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    width: 300px;
  }
`;

const Paragraph = styled.p`
  color: ${doveGray};
  margin-bottom: 2px;
`;

const Restaurant: FC<{}> = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>(null);
  const { id } = useParams();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchRestaurantDetails(id);
        setRestaurant(resp);
      } catch (e) {
        e.message;
      }
    };
    fetchData();
  }, []);
  if (!restaurant) {
    return (
      <Content>
        <Flexbox>
          <p>Unable to find restaurant</p>
        </Flexbox>
      </Content>
    );
  }

  return (
    <Content>
      <div className="container">
        <h2>{restaurant.name}</h2>
        <Paragraph>{restaurant.description}</Paragraph>
        <Paragraph>{restaurant.address}</Paragraph>
        {restaurant.meals && restaurant.meals.length > 0 && (
          <MealsListing list={restaurant.meals} />
        )}
        {error && <Banner message={error} type={BannerType.ERROR} />}
      </div>
    </Content>
  );
};

export default Restaurant;
