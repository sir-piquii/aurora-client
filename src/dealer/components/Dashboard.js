import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
