export interface IUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  lastName: string;
  birth_date: Date;
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
  id: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
}

export interface Follow {
  id: number;
  follower_id: number;
  followed_id: number;
  created_at: Date;
}

export interface FollowPayload {
  followed_id: number;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignupPayload {
  email: string;
  password: string;
  username: string;
  first_name: string;
  lastName: string;
  birthDate: string;
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
  event_photo_url: string;
}

export interface IEventResponse extends IEventDetail {
  id: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
  event_photo_url: string;
}
