import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import { usePageTitle } from "../../hooks/usePageTitle";

export const Login = () => {
  const { loginWithGoogle, setIsAuthenticating, isAuthenticating } = useAuth();
  usePageTitle("Login | Sandbox");
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-left mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Login
          </h1>
        </div>

        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:scale-105"
          disabled={isAuthenticating}
          onClick={() => {
            loginWithGoogle();
            setIsAuthenticating(true);
          }}
        >
          {isAuthenticating ? (
            <div>Loading ...</div>
          ) : (
            <button className="flex gap-3 items-center justify-center cursor-pointer">
              <FcGoogle />
              <span className="text-black font-medium">
                Continue with Google
              </span>
            </button>
          )}
        </button>
      </div>
    </div>
  );
};
