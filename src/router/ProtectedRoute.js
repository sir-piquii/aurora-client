import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) ?? null;
  const isAdmin = user?.user.role === "admin" || user?.user.role === "super";
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
