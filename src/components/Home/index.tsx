import * as React from "react";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Restaurant, fetchRestaurants } from "../../services/api";
import RestaurantsListing from "./RestaurantsListing";
import Banner, { BannerType } from "../Banner";
import { spacer40 } from "../../styles/tokens";

const Content = styled.nav`
  margin-top: ${spacer40};
`;

const Home: FC<{}> = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchRestaurants();
        setRestaurants(resp);
      } catch (e) {
        e.message;
      }
    };
    fetchData();
  }, []);

  return (
    <Content className="container">
      <h2>Restaurants</h2>
      {restaurants && <RestaurantsListing list={restaurants} />}
      {!restaurants || (restaurants.length === 0 && <></>)}
      {error && <Banner message={error} type={BannerType.ERROR} />}
    </Content>
  );
};

export default Home;
