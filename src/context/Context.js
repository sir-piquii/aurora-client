import { createContext } from "react";
/**
 * React context for managing dealer-related state.
 *
 * @typedef {Object} DealerContextType
 * @property {Object|null} dealer - The current dealer object or null if not set.
 * @property {boolean} loading - Indicates if the dealer data is still loading.
 * @property {Function} setDealer - Function to update the dealer state.
 *
 * @type {React.Context<DealerContextType>}
 */
export const DealerContext = createContext({
  dealer: null,
  loading: true,
  setDealer: () => {},
});
