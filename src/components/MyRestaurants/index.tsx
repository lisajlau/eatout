import * as React from "react";
import { useAsync, useLocalStorage } from "react-use";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import {
  UserI,
  fetchRestaurantsByOwner,
  RestaurantI,
  removeRestaurantById,
  registerRestaurant,
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
  doveGray,
  sprout,
} from "../../styles/tokens";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader";
import Banner, { BannerType } from "../Banner";
import RestaurantCell from "../RestaurantCell";
import RegisterRestaurant from "./RegisterRestaurant";

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacer40};
`;

const Content = styled.div`
  padding: ${spacer40} 0;
  min-height: calc(100vh - 100px);
`;

const Label = styled.span`
  color: ${mineShaft};
  margin-right: ${spacer8};
`;

const List = styled.div`
  margin: ${spacer24} 0;
`;

const RestaurantGrid = styled.div`
  background-color: ${fadeGray};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: ${spacer12} 0;
  color: ${doveGray};

  & > div:first-child {
    padding: ${spacer12};
  }
`;

const ButtonDiv = styled.div`
  margin: 0 ${spacer12};
  display: flex;
`;

const Button = styled.button`
  margin: ${spacer12};
`;

const MyRestaurants: FC<{}> = () => {
  const [user] = useLocalStorage<UserI>(Cookies.UserLogin);
  const [restaurants, setRestaurants] = useState<RestaurantI[]>([]);
  const [registerFlag, setRegisterFlag] = useState<boolean>(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const fetchData = useAsync(async () => {
    const resp = await fetchRestaurantsByOwner(user.username);
    setRestaurants(resp);
  }, []);

  const onRemove = useCallback(
    async (restId) => {
      try {
        const resp = await removeRestaurantById(user.username, restId);
        setRestaurants(resp);
      } catch (err) {
        setError(err.message);
      }
    },
    [restaurants]
  );

  const onRegister = useCallback(
    async (restaurant: RestaurantI) => {
      try {
        await registerRestaurant({
          ...restaurant,
          owner: user.username,
        });
        const resp = await fetchRestaurantsByOwner(user.username);
        setRestaurants(resp);
        setRegisterFlag(false);
      } catch (err) {
        setError(err.message);
      }
    },
    [restaurants]
  );

  if (!user) {
    history.push("/login?from=checkout");
  }

  return (
    <Content>
      <div className="container">
        {fetchData.loading ? (
          <Flexbox>
            <Loader size="100px" />
          </Flexbox>
        ) : fetchData.error ? (
          <Banner message={fetchData.error.message} type={BannerType.ERROR} />
        ) : registerFlag ? (
          <RegisterRestaurant
            onRegister={onRegister}
            onClose={() => setRegisterFlag(false)}
          />
        ) : (
          <div>
            <h4>My Restaurants</h4>
            {error && <Banner type={BannerType.ERROR} message={error} />}
            <List>
              <button onClick={() => setRegisterFlag(true)}>
                Add restaurants
              </button>
              {restaurants &&
                restaurants.map((rest) => (
                  <RestaurantGrid key={rest.restaurant_id}>
                    <RestaurantCell item={rest} />
                    <ButtonDiv>
                      <Link to={`myrestaurant/${rest.restaurant_id}/edit`}>
                        <Button className="button-primary">Edit</Button>
                      </Link>
                      <Button onClick={() => onRemove(rest.restaurant_id)}>
                        Remove
                      </Button>
                    </ButtonDiv>
                  </RestaurantGrid>
                ))}
            </List>
          </div>
        )}
      </div>
    </Content>
  );
};

export default MyRestaurants;
