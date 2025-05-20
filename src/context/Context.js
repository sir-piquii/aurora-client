import { createContext } from "react";
export const DealerContext = createContext({
  dealer: null,
  loading: true,
  setDealer: () => {},
});
