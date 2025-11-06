import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { authService } from "../services/auth.service";
import Cookies from "js-cookie";
import { initialUserContext } from "../contexts/types";
import { useUserContext } from "../contexts/userContext";
import { useAuthStore } from "../stores/authStore";

// interface ICookie {
//   accessToken: string | null;
//   expiresIn: number | null;
//   refreshToken: string | null;
// }

interface GoogleTokenResponse {
  data: {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
  };
}

export function useAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setUserContext, login } = useUserContext();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const fetchUserInfo = async (access_token: string) => {
    const userInfo = await authService.getUserGoogleInfo(access_token);

    if (userInfo.data) {
      // console.log({ userInfo });
      // console.log("User Info:", userInfo.data);

      setUserContext({
        id: userInfo.data.sub,
        email: userInfo.data.email,
        name: userInfo.data.name,
        picture: userInfo.data.picture,
        given_name: userInfo.data.given_name,
        family_name: userInfo.data.family_name,
        email_verified: userInfo.data.email_verified,
        isAuthenticated: true,
      });
    }

    setIsAuthenticating(false);
  };

  function getNewRefreshToken(refreshToken: string, refreshTime: number) {
    setTimeout(async () => {
      try {
        const newTokenRes = (await authService.getNewAccessToken(
          refreshToken
        )) as unknown as GoogleTokenResponse | null;

        if (newTokenRes?.data?.access_token) {
          const newAccessToken = newTokenRes.data.access_token;
          const newExpiresIn = newTokenRes.data.expires_in;

          Cookies.set("accessToken", newAccessToken, {
            expires: newExpiresIn / 86400,
          });

          fetchUserInfo(newAccessToken);

          getNewRefreshToken(newTokenRes?.data?.refresh_token, refreshTime);
        }
      } catch (e) {
        console.error("Failed to refresh access token:", e);
      }
    }, refreshTime);
  }

  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    redirect_uri: `https://${
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    }.web.app/login`,
    onSuccess: (codeResponse) => {
      console.log({ codeResponse });

      (async () => {
        try {
          //1. get refresh token, accessToken, expires
          const tokenResponse = await authService.getRefreshToken(
            codeResponse.code
          );

          if (tokenResponse?.data) {
            const responseData = tokenResponse.data;

            // 2. set Cookie with required auth details
            const expiresInSeconds = responseData.expires_in;

            Cookies.set("accessToken", responseData.access_token, {
              expires: expiresInSeconds / 86400,
            });
            Cookies.set("refreshToken", responseData.refresh_token, {
              expires: 7,
            });

            // 3. Get user info and update context
            const userInfoResponse = await authService.getUserGoogleInfo(
              responseData.access_token
            );

            if (userInfoResponse?.data) {
              const userData = userInfoResponse.data;
              console.log("Calling login with userData:", userData);
              login({
                id: userData.sub,
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                given_name: userData.given_name,
                family_name: userData.family_name,
                email_verified: userData.email_verified,
              });
              // Update zustand store
              setIsAuthenticated(true);
              console.log("Login called successfully");
            } else {
              console.error("No user data in response:", userInfoResponse);
            }

            // 4. get new access token before expires
            const refreshTime = expiresInSeconds * 0.9 * 1000; // ms
            getNewRefreshToken(responseData.refresh_token, refreshTime);
          }
          
          // Reset authenticating state after successful login
          setIsAuthenticating(false);
        } catch (error) {
          console.log(error);
          // Reset authenticating state on error
          setIsAuthenticating(false);
        }
      })();
    },
    onError: (error) => {
      console.log({ error });
      // Reset authenticating state on error
      setIsAuthenticating(false);
    },
  });

  const logout = () => {
    googleLogout();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUserContext(initialUserContext);
    setIsAuthenticated(false);
  };

  return {
    //states
    isAuthenticating,
    setIsAuthenticating,

    //methods
    fetchUserInfo,
    loginWithGoogle,
    logout,
  };
}
