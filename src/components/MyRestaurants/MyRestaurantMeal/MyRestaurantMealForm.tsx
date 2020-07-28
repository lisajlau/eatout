import * as React from "react";
import { FC, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { MealI } from "../../../services/api";
import {
  spacer40,
  fadeGray,
  mineShaft,
  spacer8,
  spacer24,
  spacer12,
  alabaster,
  doveGray,
} from "../../../styles/tokens";
import { useHistory, useParams } from "react-router-dom";

type MyRestaurantMealFormProps = {
  onSubmit: (meal: MealI) => void;
  item?: MealI;
  onRemove?: () => void;
};

const ButtonDiv = styled.div`
  margin: ${spacer24} ${spacer12};
  display: flex;
`;

const Button = styled.button`
  margin-right: ${spacer12};
`;

const MyRestaurantMealForm: FC<MyRestaurantMealFormProps> = ({
  onSubmit,
  onRemove,
  item,
}) => {
  const { restaurantId } = useParams();
  const history = useHistory();
  const [meal, setMeal] = useState<MealI>({
    description: "",
    name: "",
    price: 0,
  });
  const handleChange = useCallback(
    async (e) => {
      let value = e.target.value;
      if (e.target.id === "types") {
        value = value.split(";");
      }
      setMeal({
        ...meal,
        [e.target.id]: value,
      });
    },
    [meal]
  );
  useEffect(() => {
    if (item) {
      setMeal({
        description: item.description,
        name: item.name,
        price: item.price,
      });
    }
  }, []);
  const onClose = useCallback(() => {
    history.push(`/myrestaurant/${restaurantId}/edit`);
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(meal);
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Name for meal"
            id="name"
            value={meal.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Describe about the meal"
            id="description"
            value={meal.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            className="u-full-width"
            type="number"
            placeholder="0.00"
            id="price"
            value={meal.price}
            onChange={handleChange}
            required
          />
        </div>
        <ButtonDiv>
          <Button type="submit" className="button-primary">
            Save
          </Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          {item && (
            <Button type="button" onClick={onRemove}>
              Remove
            </Button>
          )}
        </ButtonDiv>
      </form>
    </div>
  );
};

export default MyRestaurantMealForm;
