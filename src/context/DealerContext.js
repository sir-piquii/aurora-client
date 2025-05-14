import { useEffect, useState, useContext, useCallback } from "react";
import { getDealerById } from "../api";
import { DealerContext } from "./Context";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
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
    return <span>Loading...</span>;
  }
  return (
    <DealerContext.Provider value={{ dealer, loading }}>
      {children}
    </DealerContext.Provider>
  );
};
