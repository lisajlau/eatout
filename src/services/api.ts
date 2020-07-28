import MimeType from "../constants/mimeType";

export enum OrderStatus {
  Placed = "Placed",
  Cancelled = "Cancelled",
  Processing = "Processing",
  InRoute = "InRoute",
  Delivered = "Delivered",
  Received = "Received",
}

export interface MealI {
  meal_id?: string;
  name: string;
  description: string;
  price: number;
}

export interface MealOrderI {
  meal_id: string;
  name: string;
  price: number;
  count: number;
}

export interface ConfirmedOrderResponse {
  order_id: string;
}

export interface ConfirmedOrderI {
  orders: MealOrderI[];
  order_id: string;
  status: OrderStatus;
  restaurant_id: string;
  username: string;
  updated_at: string;
}

export interface PlaceOrderPayload {
  orders: MealOrderI[];
  username: string;
  restaurant_id: string;
}

export interface RestaurantI {
  restaurant_id?: string;
  name: string;
  description: string;
  owner?: string;
  address: string;
  types?: string[];
  meals?: MealI[];
}

export interface UserI {
  name?: string;
  username: string;
  password?: string;
  role: Role;
}

export enum Role {
  User = "user",
  Owner = "owner",
}

export const parseResponse = async <T>(response: Response): Promise<T> => {
  const type = response.headers.get("content-type");
  if (type && type.includes(MimeType.JSON)) {
    return response.json();
  }
  return (response.text() as unknown) as Promise<T>;
};

export const apiFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`http://localhost:1233${url}`, {
    ...options,
  });
  if (!response.ok) {
    const message = await response.text();
    if (message) {
      throw new Error(message);
    }
    throw new Error(`${response.status}: Failed`);
  }
  return parseResponse<T>(response);
};

export const fetchRestaurants = async () =>
  apiFetch<RestaurantI[]>(`/restaurants`);

export const fetchRestaurantDetails = async (restId) =>
  apiFetch<RestaurantI>(`/restaurant/${restId}`);

export const registerUser = async ({
  username,
  name,
  password,
  role,
}: UserI) => {
  let uri = "";
  if (role === Role.User) {
    uri = "/users/register";
  } else if (role === Role.Owner) {
    uri = "/owners/register";
  }
  if (uri) {
    return apiFetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": MimeType.JSON,
      },
      body: JSON.stringify({
        username,
        name,
        password,
      }),
    });
  }
};

export const loginUser = async ({ username, password, role }: UserI) => {
  let uri = "";
  if (role === Role.User) {
    uri = "/users/login";
  } else if (role === Role.Owner) {
    uri = "/owners/login";
  }
  if (uri) {
    return apiFetch<UserI>(uri, {
      method: "POST",
      headers: {
        "Content-Type": MimeType.JSON,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  }
};

export const placeOrder = async (order: PlaceOrderPayload) => {
  return apiFetch<ConfirmedOrderResponse>(`/orders/place`, {
    method: "POST",
    headers: {
      "Content-Type": MimeType.JSON,
    },
    body: JSON.stringify(order),
  });
};

export const fetchConfirmedOrder = async (orderId: string) => {
  return apiFetch<ConfirmedOrderI>(`/orders/${orderId}`);
};
export const updateOrder = async (orderId: string, status: OrderStatus) => {
  return apiFetch<ConfirmedOrderI>(`/orders/${orderId}`, {
    method: "POST",
    headers: {
      "Content-Type": MimeType.JSON,
    },
    body: JSON.stringify({ status }),
  });
};

export const fetchAllOrdersByUser = async (username: string) => {
  return apiFetch<ConfirmedOrderI[]>(`/users/${username}/orders`);
};

export const fetchRestaurantsByOwner = async (username: string) => {
  return apiFetch<RestaurantI[]>(`/owners/${username}/restaurants`);
};

export const registerRestaurant = async (data: RestaurantI) => {
  return apiFetch<string>("/restaurants/register", {
    method: "POST",
    headers: {
      "Content-Type": MimeType.JSON,
    },
    body: JSON.stringify(data),
  });
};

export const removeRestaurantById = async (userId: string, restId: string) => {
  return apiFetch<RestaurantI[]>(`/restaurants/${userId}/remove/${restId}`, {
    method: "POST",
    headers: {
      "Content-Type": MimeType.JSON,
    },
  });
};

export const getAllOrderByRestaurant = async (restId: string) => {
  return apiFetch<ConfirmedOrderI[]>(`/restaurant/${restId}/orders`);
};

export const addMealToRestaurant = async (restId: string, data: MealI) => {
  return apiFetch<string>(`/restaurant/${restId}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": MimeType.JSON,
    },
    body: JSON.stringify(data),
  });
};

export const editMealForRestaurant = async (
  restId: string,
  mealId: string,
  data: MealI
) => {
  return apiFetch<string>(`/restaurant/${restId}/meals/${mealId}`, {
    method: "POST",
    headers: {
      "Content-Type": MimeType.JSON,
    },
    body: JSON.stringify(data),
  });
};

export const removeMealForRestaurant = async (
  restId: string,
  mealId: string
) => {
  return apiFetch<string>(`/restaurant/${restId}/meals/${mealId}/remove`, {
    method: "POST",
  });
};

export const getMealForRestaurant = async (restId: string, mealId: string) => {
  return apiFetch<MealI>(`/restaurant/${restId}/meals/${mealId}`);
};

export const removeMealFromRestaurant = async (
  restId: string,
  data: RestaurantI,
  mealId: string
) => {
  return apiFetch<string>(`/restaurant/${restId}/meals/${mealId}/remove`, {
    method: "POST",
  });
};

export const getAllBlockedByRestaurant = async (restId: string) => {
  return apiFetch<string[]>(`/restaurant/${restId}/blocked`);
};

export const blockUserForRestaurant = async (
  restId: string,
  username: string
) => {
  return apiFetch<string[]>(`/restaurant/${restId}/block/${username}`, {
    method: "POST",
  });
};
