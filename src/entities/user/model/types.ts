export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  genres?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}
