import * as React from "react";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useAsync } from "react-use";
import { RestaurantI, fetchRestaurants } from "../../services/api";
import RestaurantsListing from "./RestaurantsListing";
import Banner, { BannerType } from "../Banner";
import { spacer40 } from "../../styles/tokens";
import Loader from "../Loader";

const Content = styled.div`
  margin-top: ${spacer40};
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacer40};
`;

const Home: FC<{}> = () => {
  const [restaurants, setRestaurants] = useState<RestaurantI[]>(null);
  const fetchData = useAsync(async () => {
    const resp = await fetchRestaurants();
    setRestaurants(resp);
  }, []);

  const showRestaurants = () => {
    if (restaurants && restaurants.length > 0) {
      return <RestaurantsListing list={restaurants} />;
    }
  };

  return (
    <Content className="container">
      <h4>Have a craving?</h4>
      {fetchData.loading ? (
        <Flexbox>
          <Loader size="100px" />
        </Flexbox>
      ) : fetchData.error ? (
        <Banner message={fetchData.error.message} type={BannerType.ERROR} />
      ) : (
        showRestaurants()
      )}
    </Content>
  );
};

export default Home;
