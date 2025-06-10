import { useEffect, useState, useContext, useCallback } from "react";
import { getDealerById } from "../api";
import { DealerContext } from "./Context";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
import { Loader } from "lucide-react";

/**
 * DealerProvider is a React context provider component that manages and provides
 * dealer-related data to its children components. It fetches dealer details based
 * on the authenticated user's ID and handles loading state and error notifications.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the dealer context.
 * @returns {JSX.Element} The DealerContext provider wrapping its children, or a loading indicator while fetching data.
 *
 * @example
 * <DealerProvider>
 *   <YourComponent />
 * </DealerProvider>
 */
export const DealerProvider = ({ children }) => {
  const [dealer, setDealer] = useState(null);
  const useAuth = useContext(AuthContext);
  const { user: userData } = useAuth;
  const [loading, setLoading] = useState(true);
  const fetchDealer = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDealerById(userData.user.id);
      setDealer(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Dealer Details");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchDealer();
  }, [fetchDealer]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <DealerContext.Provider value={{ dealer, loading }}>
      {children}
    </DealerContext.Provider>
  );
};
