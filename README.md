# EATOUT

This project , uses [parcel](https://parceljs.org/getting_started.html), SCSS, html and JS. Please refer to website on how to set up. It also uses [Skeleton](http://getskeleton.com/) as a CSS boilerplate.

## Technical implementations

- Focus on FE, not BE
- The password is saved in plain text, due to simplicity, but should be encrypted in actual implementation
- Users aren't allowed to register with the same email address
- Restaurant with same names is not allowed
- This has not been tested with multiple devices, but have been build with responsive in mind
- There are some example tests cases but they are not complete

## Functional requirements

Write an application for Food Delivery

User must be able to create an account and log in.
Implement 2 roles with different permission levels
_ Regular User: Can see all restaurants and place orders from them
_ Restaurant Owner: Can CRUD restaurants and meals
A Restaurant should have a name and description of the type of food they serve
A meal should have a name, description, and price
Orders consist of a list of meals, date, total amount and status
An Order should be placed for a single Restaurant only, but it can have multiple meals
Restaurant Owners and Regular Users can change the Order Status respecting below flow and permissions:
_ Placed: Once a Regular user places an Order
_ Canceled: If the Regular User cancel the Order
_ Processing: Once the Restaurant Owner starts to make the meals
_ In Route: Once the meal is finished and Restaurant Owner marks it’s on the way
_ Delivered: Once the Restaurant Owner receives information that the meal was delivered by their staff
_ Received: Once the Regular User receives the meal and marks it as Received
Status should follow the sequence as stated above, and not allowed to move back
Status can not be changed by a different user than is stated above
Orders should have a history about the date and time of the status changing
Both Regular Users and Restaurant Owners should be able to see a list of the orders
Restaurant Owners have the ability to block a User

REST API. Make it possible to perform all user actions via the API, including authentication. If you don’t know how to create your own backend you can use Firebase.com or similar services to create the API.
In any case, you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly. Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.
If it’s a web application, it must be a single-page application. All actions need to be done client-side using AJAX, refreshing the page is not acceptable.
Functional UI/UX design is needed. You are not required to create a unique design, however, do follow best practices to make the project as functional as possible.
Bonus: unit and e2e tests.

### Addtionals requirements (nice to have but not implemented)

- Allergies for each meal

## Developer handbook

### Build and run locally

1. install dependencies:

```sh
yarn install
```

2. Run the backend

```sh
yarn start:backend
```

3. Run the FE

```sh
yarn dev
```

```sh
yarn dev
```

4. Create a production build

```sh
yarn build
```

### Endpoints

Refer to (doc)[./Endpoint.md]

### How to test

1. A few accounts have been created, together with some restaurants. Refer to json files in the `backend` folder.
2. user1@gmail.com is currently blocked by rest_0

### TODO

4. Update readme and videos
