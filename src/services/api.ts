import MimeType from "../constants/mimeType";

export interface Meal {
  meal_id: string;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  meal_id: string;
  name: string;
  price: number;
  count: number;
}

export interface Restaurant {
  restaurant_id: string;
  name: string;
  description: string;
  owner: string;
  address: string;
  types: string[];
  meals?: Meal[];
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
  apiFetch<Restaurant[]>(`/restaurants`);

export const fetchRestaurantDetails = async (restId) =>
  apiFetch<Restaurant>(`/restaurant/${restId}`);

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
    return apiFetch(uri, {
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
