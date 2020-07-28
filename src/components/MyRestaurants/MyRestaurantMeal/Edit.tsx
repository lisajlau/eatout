import * as React from "react";
import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import {
  MealI,
  getMealForRestaurant,
  editMealForRestaurant,
  removeMealForRestaurant,
} from "../../../services/api";
import { useAsync } from "react-use";
import MyRestaurantMealForm from "./MyRestaurantMealForm";
import { useParams, useHistory } from "react-router-dom";
import Banner, { BannerType } from "../../Banner";
import { spacer40 } from "../../../styles/tokens";
import Loader from "../../Loader";

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
  const [meal, setMeal] = useState<MealI>(null);
  const [error, setError] = useState("");
  const fetchData = useAsync(async () => {
    const resp = await getMealForRestaurant(restaurantId, mealId);
    setMeal(resp);
  }, []);

  const onUpdate = useCallback(
    async (meal) => {
      try {
        await editMealForRestaurant(restaurantId, mealId, meal);
        history.push(`/myrestaurant/${restaurantId}/edit`);
      } catch (e) {
        setError(e.message);
      }
    },
    [restaurantId, mealId]
  );

  const onRemove = useCallback(async () => {
    try {
      await removeMealForRestaurant(restaurantId, mealId);
      history.push(`/myrestaurant/${restaurantId}/edit`);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  return (
    <Content>
      <div className="container">
        <h4>Edit meal</h4>
        {error && <Banner message={error} type={BannerType.ERROR} />}
        {fetchData.loading ? (
          <Flexbox>
            <Loader size="100px" />
          </Flexbox>
        ) : fetchData.error ? (
          <Banner message={fetchData.error.message} type={BannerType.ERROR} />
        ) : (
          <MyRestaurantMealForm
            item={meal}
            onSubmit={onUpdate}
            onRemove={onRemove}
          />
        )}
      </div>
    </Content>
  );
};

export default MyRestaurantMealEdit;
