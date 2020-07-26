import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Restaurant } from "../../services/api";
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

type RestaurantsProps = {
  list: Restaurant[];
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

const RestaurantNameCell = styled.h5`
  color: ${mineShaft};
`;

const RestaurantCell = styled.div`
  margin: ${spacer8};
`;

const AddressCell = styled(RestaurantCell)`
  &::before {
    content: "\\01F4CD";
  }
`;

const Pill = styled.span`
  background-color: ${doveGray};
  color: ${alabaster};
  margin-right: ${spacer8};
  padding: ${spacer8};
  border-radius: 5px;
  font-size: 0.8em;
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

const Restaurant: FC<{ item: Restaurant }> = ({ item }) => {
  return (
    <RestaurantGrid>
      <div>
        <RestaurantCell>
          <RestaurantNameCell>{item.name}</RestaurantNameCell>
        </RestaurantCell>
        <RestaurantCell>
          {item.types.map((type) => (
            <Pill key={type}>{type}</Pill>
          ))}
        </RestaurantCell>
        <RestaurantCell>{item.description}</RestaurantCell>
        <AddressCell>
          <a
            target="_blank"
            href={`https://www.google.com/maps/?q=${item.address}`}
            rel="noopener noreferrer"
          >
            {item.address}
          </a>
        </AddressCell>
      </div>

      <RestaurantCTA>
        <Button to={`/restaurant/${item.restaurant_id}`}>View menu</Button>
      </RestaurantCTA>
    </RestaurantGrid>
  );
};

const RestaurantsListing: FC<RestaurantsProps> = ({ list }) => {
  return (
    <Grid>
      {list &&
        list.map((rest) => (
          <Restaurant item={rest} key={rest.id}>
            {rest.name}
          </Restaurant>
        ))}
    </Grid>
  );
};

export default RestaurantsListing;
