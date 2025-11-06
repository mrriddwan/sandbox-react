import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { authService } from "../services/auth.service";
import { initialUserContext, type IUser } from "../contexts/types";
import { UserContext } from "../contexts/userContext";
import { useAuthStore } from "../stores/authStore";

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>(initialUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const logout = useCallback(() => {
    setUser(initialUserContext);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken && refreshToken) {
          const res = await authService.getUserGoogleInfo(accessToken);
          
          if (res.data) {
            const userData = res.data;
            setUser({
              id: userData.sub,
              email: userData.email,
              name: userData.name,
              picture: userData.picture,
              given_name: userData.given_name,
              family_name: userData.family_name,
              email_verified: userData.email_verified,
              isAuthenticated: true,
            });
            setIsAuthenticated(true);
          }
        } else {
          setUser(initialUserContext);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Invalid token or failed to fetch user info", err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [logout, setIsAuthenticated]);

  const login = useCallback((userData: Partial<IUser>) => {
    console.log("login function called with:", userData);
    setUser(prev => {
      const newUser = {
        ...prev,
        ...userData,
        isAuthenticated: true,
      };
      console.log("Setting user context to:", newUser);
      return newUser;
    });
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  const contextValue = useMemo(
    () => ({ 
      userContext: user, 
      setUserContext: setUser, 
      isLoading,
      login,
      logout,
      isAuthenticated: user.isAuthenticated
    }),
    [user, isLoading, login, logout]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};