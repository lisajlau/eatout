## Endpoints

1. Login user

`POST /users/login`

#### Data params

Required: username, password

#### Success Response

200

#### Error Response

2. Get all users

`GET /users`

#### Success Response

200

#### Error Response

3. Register a user

`POST /users/register`

#### Data params

Required: username, firstName, lastName, password

#### Success Response

200

#### Error Response

4. Get all restaurant owners

`GET /owners`

#### Success Response

200

#### Error Response

5. Register a restaurant owner

`POST /owners/register`

#### Data params

Required: username, firstName, lastName, password

#### Success Response

200

#### Error Response

6. Login an owner

`POST /owners/login`

#### Data params

Required: username, password

#### Success Response

200

#### Error Response

7. Get all restaurants

`GET restaurants`

#### Success Response

200

#### Error Response

8. Register a restaurant for an owner

`POST /restaurants/register`

#### Data params

Required: name, address, owner

#### Success Response

200

#### Error Response

9. Get menu for a restaurant

`GET /restaurant/:id/meals`

#### Success Response

200

#### Error Response

10. Get a restaurant details

`GET /restaurant/:restaurant_id`

#### Success Response

200

#### Error Response

11. Block a given user

`POST /users/:username/block`

#### Data params

Required: username, restaurant id

#### Success Response

200

#### Error Response

12. Title

`POST /owners/register`

#### URL params

Required:
Optional:

#### Data params

Required:
Optional:

#### Success Response

200

#### Error Response
