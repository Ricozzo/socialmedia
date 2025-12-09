export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  birth_year: number;
  phone_number: string;
  profilePictureUrl: string;
  created_at: string;
  updated_at: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignupPayload {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  phone: string;
}

export interface ILoginResponse {
  authToken: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: IUser | null;
  storeToken: (token: string) => void;
  authenticateUser: () => void;
  logoutUser: () => void;
  getToken: () => string | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IEventDetail {
  creator_id: number,
  name: string;
  description: string;
  event_date: string;
  event_time: string;
  address: string;
  location_optional: string;
}

export interface IEventResponse {
  authToken: string;
}


