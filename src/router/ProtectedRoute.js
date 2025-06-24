import { Navigate } from "react-router-dom";
/**
 * A React component that restricts access to its children based on user role.
 * Only users with the "admin" or "super" role can access the protected content.
 * If the user is not authorized, they are redirected to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if access is granted.
 * @returns {React.ReactNode} The protected children or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) ?? null;
  const isAdmin = user?.user.role === "admin" || user?.user.role === "super";
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
