
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import { useUserContext } from "./contexts/userContext";
import { Login } from "./components/auth/Login";

function App() {
  const { isLoading, isAuthenticated } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-neutral-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-100">
      {/* Dashboard */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          isAuthenticated ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full w-full">
          <Dashboard />
        </div>
      </div>

      {/* Login */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          isAuthenticated ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <Login />
      </div>
    </div>
  );
}

export default App;