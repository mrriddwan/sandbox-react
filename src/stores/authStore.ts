import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const getInitialAuthState = (): boolean => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  return !!(accessToken && refreshToken);
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getInitialAuthState(),
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

export type AuthStateType = AuthState;

