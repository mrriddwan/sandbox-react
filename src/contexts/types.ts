export interface IUser {
  id: string | null;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: string;
  isAuthenticated: boolean;
}

export interface IUserContextValue {
  userContext: IUser;
  setUserContext: React.Dispatch<React.SetStateAction<IUser>>;
  isLoading: boolean;
  login: (userData: Partial<IUser>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

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