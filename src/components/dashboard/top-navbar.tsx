import { useAuthStore } from '../../stores/authStore';
import { useUserContext } from '../../contexts/userContext';

export default function TopNavbar() {
    const { userContext, logout } = useUserContext();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleSignOut = () => {
    logout();
    setIsAuthenticated(false);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-4 m-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {userContext.picture && (
              <img
                src={userContext.picture}
                alt={userContext.name || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-gray-800 font-medium text-lg">
              {userContext.name || "User"}
            </span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>
  )
}
