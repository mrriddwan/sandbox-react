import type { IUser } from "./types";

export const initialUserContext: IUser = {
  id: null,
  email: "",
  name: "",
  picture: "",
  given_name: "",
  family_name: "",
  email_verified: "",
  isAuthenticated: false,
};