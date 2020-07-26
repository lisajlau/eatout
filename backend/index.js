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
const app = express();

const status = {
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
      return res.status(200).send();
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
      return res.status(200).send();
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
  const { name, address, owner } = req.body;
  const found = restaurants.filter((res) => res.name === name);
  if (found.length > 0) {
    return res
      .status(400)
      .send("This business name has already been registered");
  }
  restaurants.push({
    name,
    address,
    owner,
    description,
    type,
  });
  res.send(`Restaurant ${name} added`);
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
  meals[id].push({
    name,
    description,
    price,
  });
  res.send("Meal added");
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
app.post("/users/:username/order", (req, res) => {});

app.get("/users/:username/order/status", (req, res) => {});
app.post("/users/:username/order/status", (req, res) => {});

app.get("/users/:username/order", (req, res) => {});

app.get("/restaurant/:id/orders", (req, res) => {});

// Start it up.

const PORT = 1233;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Serving http://localhost:${PORT}`);
});
