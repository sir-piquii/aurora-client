import { Navigate, Outlet } from "react-router-dom";

/**
 * DealerRoute is a React component that conditionally renders its children or redirects to the login page.
 *
 * It checks if a 'user' item exists in sessionStorage:
 * - If no user is found, it renders the nested routes via <Outlet />.
 * - If a user is found, it redirects to the "/login" route.
 *
 * @returns {JSX.Element} The rendered route component or a redirect.
 */
const DealerRoute = () => {
  const user = sessionStorage.getItem("user");
  return !user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default DealerRoute;
