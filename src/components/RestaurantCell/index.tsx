import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RestaurantI } from "../../services/api";
import {
  spacer8,
  spacer12,
  mineShaft,
  doveGray,
  alabaster,
} from "../../styles/tokens";

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

const Restaurant: FC<{ item: RestaurantI }> = ({ item }) => {
  return (
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
  );
};

export default Restaurant;
