import * as React from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import RestaurantOrder from "./RestaurantOrder";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import OrderStatusView from "./OrderStatusView";
import MyOrders from "./MyOrders";
import MyRestaurants from "./MyRestaurants";
import MyRestaurantsEdit from "./MyRestaurants/MyRestaurantEdit";
import MyRestaurantMealAdd from "./MyRestaurants/MyRestaurantMeal/Add";
import MyRestaurantMealEdit from "./MyRestaurants/MyRestaurantMeal/Edit";

const App: React.FC<{}> = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/myrestaurants">
            <Header login />
            <MyRestaurants />
          </Route>
          <Route path="/myrestaurant/:restaurantId/edit">
            <Header login />
            <MyRestaurantsEdit />
          </Route>
          <Route path="/myrestaurant/:restaurantId/meals/add">
            <Header login />
            <MyRestaurantMealAdd />
          </Route>
          <Route path="/myrestaurant/:restaurantId/meals/:mealId">
            <Header login />
            <MyRestaurantMealEdit />
          </Route>
          <Route path="/myorders">
            <Header login />
            <MyOrders />
          </Route>
          <Route path="/confirmed/order/:orderId">
            <Header login />
            <OrderStatusView />
          </Route>
          <Route path="/checkout">
            <Header login />
            <Checkout />
          </Route>
          <Route path="/restaurant/:id">
            <Header login />
            <RestaurantOrder />
          </Route>
          <Route path="/signup">
            <Header />
            <Signup />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/">
            <Header login />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
