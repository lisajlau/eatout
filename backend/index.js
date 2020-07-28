const express = require("express");
const bodyParser = require("body-parser");
const restaurantsJson = require("./restaurants.json");
const ownersJson = require("./restaurants_owners.json");
const usersJson = require("./users.json");
const mealsJson = require("./meals.json");

let restaurants = JSON.parse(JSON.stringify(restaurantsJson));
let users = JSON.parse(JSON.stringify(usersJson));
let owners = JSON.parse(JSON.stringify(ownersJson));
let meals = JSON.parse(JSON.stringify(mealsJson));
let allOrders = [
  {
    order_id: "order_0",
    username: "user1@gmail.com",
    orders: [
      {
        meal_id: "meal_0",
        count: 1,
        name: "Traditional Winter Melon",
        price: 6.5,
      },
      { meal_id: "meal_1", count: 2, name: "MissMe Milk - Warm/Hot", price: 7 },
      { meal_id: "meal_2", count: 3, name: "Yakult Iced Tea", price: 8 },
    ],
    restaurant_id: "rest_3",
    status: "Cancelled",
    updated_at: "2020-07-26T18:47:23.757Z",
  },
  {
    order_id: "order_1",
    username: "user1@gmail.com",
    orders: [
      {
        meal_id: "meal_0",
        count: 1,
        name: "Traditional Winter Melon",
        price: 6.5,
      },
      { meal_id: "meal_1", count: 2, name: "MissMe Milk - Warm/Hot", price: 7 },
      { meal_id: "meal_2", count: 3, name: "Yakult Iced Tea", price: 8 },
    ],
    restaurant_id: "rest_0",
    status: "Placed",
    updated_at: "2020-07-26T18:47:23.757Z",
  },
];
const app = express();

const Role = {
  User: "user",
  Owner: "owner",
};

const Status = {
  PLACED: "Placed",
  CANCELLED: "Cancelled",
  PROCESSING: "Processing",
  IN_ROUTE: "In Route",
  DELIVERED: "Delivered",
  RECEIVED: "Received",
};

// Middleware

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  setTimeout(next, 100 + Math.random() * 500);
});

// Debug endpoints

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users/login", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const { username, password } = req.body;
  if (users.users.includes(username)) {
    const userDetails = users.account_details.filter(
      (detail) => detail.username === username
    )[0];
    if (userDetails.password === password) {
      return res.status(200).send({
        name: userDetails.name,
        username: userDetails.username,
        role: Role.User,
      });
    }
  }
  return res.status(400).send(`Invalid username or password`);
});

app.post("/users/register", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const { username, name, password } = req.body;
  if (users.users.includes(username)) {
    return res.status(400).send(`User ${username} has already been used`);
  }

  users.users.push(username);
  users.account_details = users.account_details.concat({
    username,
    name,
    password,
  });
  res.send(`User ${username} added`);
});

app.post("/owners/login", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const { username, password } = req.body;
  if (owners.users.includes(username)) {
    const ownerDetails = owners.account_details.filter(
      (detail) => detail.username === username
    )[0];
    if (ownerDetails.password === password) {
      return res.status(200).send({
        name: ownerDetails.name,
        username: ownerDetails.username,
        role: Role.Owner,
      });
    }
  }
  return res.status(400).send(`Invalid username or password`);
});

app.get("/owners", (req, res) => {
  res.send(owners);
});

app.post("/owners/register", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const { username, name, password } = req.body;
  if (owners.users.includes(username)) {
    return res
      .status(400)
      .send(`Owner with username ${username} has already been used`);
  }
  owners.users.push(username);
  owners.account_details = owners.account_details.concat({
    username,
    name,
    password,
  });
  res.send(`Owner with username ${username} added`);
});

app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});

app.post("/restaurants/register", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const { name, address, owner, types, description } = req.body;
  const found = restaurants.filter((res) => res.name === name);
  if (found.length > 0) {
    return res
      .status(400)
      .send("This business name has already been registered");
  }
  const rnd = Math.floor(Math.random() * 10000000);
  const restaurant_id = `rest_${rnd}`;
  restaurants.push({
    name,
    address,
    owner,
    description,
    types,
    restaurant_id,
  });
  meals[restaurant_id] = [];
  res.status(200).send(`Restaurant ${name} added`);
});

app.get("/restaurant/:id/meals", (req, res) => {
  const id = req.params.id;
  const found = restaurants.filter((res) => res.name === name);
  if (found) {
    return res.send(meals[id]);
  }
  return res.status(400).send("Unable to find restaurant");
});

app.post("/restaurant/:id/meals", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const id = req.params.id;
  const found = restaurants.filter((res) => res.restaurant_id === id);
  if (!found.length) {
    return res.status(400).send("Restaurant not found");
  }
  const { name, description, price } = req.body;
  const rnd = Math.floor(Math.random() * 10000000);
  const meal_id = `meal_${rnd}`;
  meals[id].push({
    meal_id,
    name,
    description,
    price,
  });
  res.send("Meal added");
});

app.get("/restaurant/:id/meals/:mealId", (req, res) => {
  const restId = req.params.id;
  const mealId = req.params.mealId;
  const found = restaurants.filter((res) => res.restaurant_id === restId);
  if (!found.length) {
    return res.status(400).send("Restaurant not found");
  }
  const foundMeal = meals[restId].find((meal) => meal.meal_id === mealId);
  res.send(foundMeal);
});

app.post("/restaurant/:id/meals/:mealId", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const restId = req.params.id;
  const mealId = req.params.mealId;
  const found = restaurants.filter((res) => res.restaurant_id === restId);
  if (!found.length) {
    return res.status(400).send("Restaurant not found");
  }
  let foundMeal = meals[restId].findIndex((meal) => meal.meal_id === mealId);
  const { name, description, price } = req.body;
  meals[restId][foundMeal] = {
    meal_id: mealId,
    name,
    description,
    price,
  };
  res.send(`Meal ${mealId} updated`);
});

app.post("/restaurant/:id/meals/:mealId/remove", (req, res) => {
  const restId = req.params.id;
  const mealId = req.params.mealId;
  const found = restaurants.filter((res) => res.restaurant_id === restId);
  if (!found.length) {
    return res.status(400).send("Restaurant not found");
  }
  let foundMeal = meals[restId].findIndex((meal) => meal.meal_id === mealId);
  meals[restId].splice(foundMeal, 1);
  res.status(200).send();
});

app.post("/restaurant/:id/meals/:mealId/remove", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No information sent");
  }
  const restId = req.params.id;
  const mealId = req.params.mealId;
  const found = restaurants.filter((res) => res.restaurant_id === restId);
  if (!found.length) {
    return res.status(400).send("Restaurant not found");
  }
  const foundIndex = meals[restId].findIndex((meal) => meal.meal_id === mealId);
  meals.splice(foundIndex, 1);
});

app.get("/restaurant/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  const found = restaurants.filter((res) => res.restaurant_id === id);
  if (found.length > 0) {
    const restaurant = found[0];
    restaurant.meals = meals[id];
    return res.send(restaurant);
  }
  return res.status(400).send("Unable to find restaurant");
});

app.post("/restaurants/:user_id/remove/:restaurant_id", (req, res) => {
  const user = req.params.user_id;
  const restaurant = req.params.restaurant_id;
  const found = restaurants.findIndex(
    (res) => res.restaurant_id === restaurant && res.owner === user
  );
  if (found !== -1) {
    restaurants.splice(found, 1);
    return res
      .status(200)
      .send(restaurants.filter((res) => res.owner === user));
  }
  return res.status(400).send("Unable to find restaurant");
});

app.post("/users/:username/block", (req, res) => {
  const username = req.params.username;
  const { restaurantId } = req.body;
  const usersDetails = users.account_details;
  for (let i = 0; i < usersDetails.length; i++) {
    if (usersDetails[i].username === username) {
      if (!usersDetails[i].blocked.includes(restaurantId)) {
        usersDetails[i].blocked.push(restaurantId);
        return res.status(200).send("Added");
      }
    }
  }
  res.status(200).send("Already added");
});

// TODO
app.post("/orders/place", (req, res) => {
  const { username, restaurant_id, orders } = req.body;
  const ordersByUser = allOrders.filter((order) => order.username === username);
  const rnd = Math.floor(Math.random() * 10000000);
  const orderId = `order_${rnd}`;
  if (ordersByUser.length > 0) {
    const openOrdersByUser = ordersByUser.filter(
      (order) =>
        order.status !== Status.RECEIVED && order.status !== Status.CANCELLED
    );
    if (openOrdersByUser.length > 0) {
      return res
        .status(400)
        .send(`There is an existing order ${openOrdersByUser[0].order_id}`);
    }
  }
  const userDetails = users.account_details.filter(
    (detail) => detail.username === username
  )[0];
  if (userDetails.blocked.includes(restaurant_id)) {
    return res
      .status(400)
      .send(`Unable to process order. Please contact support.`);
  }
  allOrders.push({
    order_id: orderId,
    username,
    orders,
    restaurant_id,
    status: Status.PLACED,
    updated_at: new Date(),
  });
  return res.status(200).send({ order_id: orderId });
});

app.get("/users/:username/orders", (req, res) => {
  const username = req.params.username;
  const ordersByUser = allOrders.filter((order) => order.username === username);
  return res.status(200).send(ordersByUser);
});

app.get("/orders/:order_id", (req, res) => {
  const order_id = req.params.order_id;
  const currentOrder = allOrders.find((order) => order.order_id === order_id);
  return res.status(200).send(currentOrder);
});

app.post("/orders/:order_id", (req, res) => {
  const order_id = req.params.order_id;
  const { status } = req.body;
  const currentOrder = allOrders.filter(
    (order) => order.order_id === order_id
  )[0];
  if (!currentOrder && currentOrder.length === 0) {
    return res.status(400).send(`Failed to cancel order ${order_id}`);
  }
  currentOrder.status = status;
  return res.status(200).send(currentOrder);
});

app.get("/users/:username/openOrders", (req, res) => {
  const username = req.params.username;
  const ordersByUser = allOrders.filter((order) => order.username === username);
  if (ordersByUser.length > 0) {
    const openOrdersByUser = ordersByUser.filter(
      (order) =>
        order.status !== Status.DELIVERED && order.status !== Status.CANCELLED
    );
    return res.status(200).send(openOrdersByUser);
  }
  return res.status(200).send([]);
});

app.get("/owners/:username/restaurants", (req, res) => {
  const username = req.params.username;
  const found = restaurants.filter((res) => res.owner === username);
  return res.status(200).send(found);
});

app.get("/restaurant/:restaurant_id/blocked", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const blockedUsers = [];
  users.account_details.forEach((detail) => {
    if (detail.blocked.includes(restaurant_id)) {
      blockedUsers.push(detail.username);
    }
  });
  return res.status(200).send(blockedUsers);
});

app.post("/restaurant/:restaurant_id/block/:username", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const username = req.params.username;
  const userDetails = users.account_details.filter(
    (detail) => detail.username === username
  )[0];
  if (!userDetails.blocked.includes(restaurant_id)) {
    userDetails.blocked.push(restaurant_id);
    return res.status(200).send();
  }
  return res.status(200).send();
});

app.get("/restaurant/:restaurant_id/orders", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const ordersByUser = allOrders.filter(
    (order) => order.restaurant_id === restaurant_id
  );
  return res.status(200).send(ordersByUser);
});

// Start it up.

const PORT = 1233;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Serving http://localhost:${PORT}`);
});
