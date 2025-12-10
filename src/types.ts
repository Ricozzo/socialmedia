export interface IUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birth_year: number;
  phone_number: string;
  profilePictureUrl: string;
  created_at: string;
  updated_at: string;
}

export interface IProfile {
  username: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
}

export interface IProfileResponse extends IProfile {
  _id: string;
  creator_id: number;
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
  profilePictureUrl: string;
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

export interface IEventDetail {
  name: string;
  description: string;
  event_date: string;
  event_time: string;
  address: string;
  location_optional: string;
}

export interface IEventResponse extends IEventDetail {
  _id: string;
  creator_id: number;
  created_at: string; 
  updated_at: string;
}


