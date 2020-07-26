import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RestaurantI } from "../../services/api";
import {
  sprout,
  fadeGray,
  spacer8,
  spacer12,
  mineShaft,
  doveGray,
  alabaster,
  spacer24,
  spacer48,
} from "../../styles/tokens";
import RestaurantCell from "../RestaurantCell";

type RestaurantsProps = {
  list: RestaurantI[];
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: ${spacer24};
  row-gap: ${spacer24};
  margin: ${spacer48} 0;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const RestaurantGrid = styled.div`
  background-color: ${fadeGray};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: ${doveGray};

  & > div:first-child {
    padding: ${spacer12};
  }
`;

const RestaurantCTA = styled.div`
  align-self: flex-end;
  background-color: ${sprout};
  margin-top: ${spacer12};
  width: 100%;
`;

const Button = styled(Link)`
  margin: ${spacer8} 0;
  border: 0;
  color: ${alabaster};
  text-decoration: none;
  padding: 0 ${spacer24};
  display: block;
`;

const RestaurantsListing: FC<RestaurantsProps> = ({ list }) => {
  return (
    <Grid>
      {list &&
        list.map((rest) => (
          <>
            <RestaurantGrid>
              <RestaurantCell item={rest} key={rest.restaurant_id} />

              <RestaurantCTA>
                <Button to={`/restaurant/${rest.restaurant_id}`}>
                  View menu
                </Button>
              </RestaurantCTA>
            </RestaurantGrid>
          </>
        ))}
    </Grid>
  );
};

export default RestaurantsListing;
