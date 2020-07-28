import * as React from "react";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { MealI, addMealToRestaurant } from "../../../services/api";
import MyRestaurantMealForm from "./MyRestaurantMealForm";
import { useParams, useHistory } from "react-router-dom";
import Banner, { BannerType } from "../../Banner";
import { spacer40 } from "../../../styles/tokens";

const Content = styled.div`
  margin-top: ${spacer40};
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacer40};
`;

const MyRestaurantMealEdit: FC<{}> = ({}) => {
  const { restaurantId, mealId } = useParams();
  const history = useHistory();
  const [error, setError] = useState("");

  const onUpdate = useCallback(
    async (meal) => {
      try {
        await addMealToRestaurant(restaurantId, meal);
        history.push(`/myrestaurant/${restaurantId}/edit`);
      } catch (e) {
        setError(e.message);
      }
    },
    [restaurantId, mealId]
  );

  return (
    <Content>
      <div className="container">
        <h4>Add meal</h4>
        {error && <Banner message={error} type={BannerType.ERROR} />}
        <MyRestaurantMealForm onSubmit={onUpdate} />
      </div>
    </Content>
  );
};

export default MyRestaurantMealEdit;
