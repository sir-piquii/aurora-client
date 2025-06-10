import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
/**
 * Dashboard component that serves as the main layout for the dealer dashboard.
 * 
 * - Retrieves the authenticated user from AuthContext.
 * - Renders a main container with styling for layout and transitions.
 * - Uses <Outlet /> to render nested routes.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard layout with nested routes.
 */
const Dashboard = () => {
  const useAuth = useContext(AuthContext);
  const { user } = useAuth;
  return (
    <main
      className={
        "w-full flex flex-col items-center transition-all duration-300 ease-in-out"
      }
    >
      <Outlet />
    </main>
  );
};

export default Dashboard;
