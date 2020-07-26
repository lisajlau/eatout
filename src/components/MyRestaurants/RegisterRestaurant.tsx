import * as React from "react";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { RestaurantI } from "../../services/api";

import {
  spacer40,
  fadeGray,
  mineShaft,
  spacer8,
  spacer24,
  spacer12,
  alabaster,
  doveGray,
} from "../../styles/tokens";

type RegisterRestaurant = {
  onRegister: (rest: RestaurantI) => void;
  onClose: () => void;
};

const ButtonDiv = styled.div`
  margin: ${spacer24} ${spacer12};
  display: flex;
`;

const Button = styled.button`
  margin-right: ${spacer12};
`;

const RegisterRestaurant: FC<RegisterRestaurant> = ({
  onRegister,
  onClose,
}) => {
  const [restaurant, setRestaurant] = useState<RestaurantI>({
    name: "",
    description: "",
    owner: "",
    address: "",
    types: [],
  });
  const [error, setError] = useState("");
  const handleChange = useCallback(
    async (e) => {
      setError("");
      let value = e.target.value;
      if (e.target.id === "types") {
        value = value.split(";");
      }
      setRestaurant({
        ...restaurant,
        [e.target.id]: value,
      });
    },
    [restaurant]
  );
  return (
    <div>
      <h4>Register</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister(restaurant);
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Business name"
            id="name"
            value={restaurant.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Tell us more"
            id="description"
            value={restaurant.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Address</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Where is this"
            id="address"
            value={restaurant.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Address</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Dessert; Fast food"
            id="types"
            value={restaurant.types.join(";")}
            onChange={handleChange}
            required
          />
        </div>
        <ButtonDiv>
          <Button type="submit" className="button-primary">
            Register
          </Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
        </ButtonDiv>
      </form>
    </div>
  );
};

export default RegisterRestaurant;
