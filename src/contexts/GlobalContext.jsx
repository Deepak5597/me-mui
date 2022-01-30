import { createContext, useReducer } from "react";
import partyReducer from '../reducers/partyReducer';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [partyData, partyDispatcher] = useReducer(partyReducer, { data: [], isLoading: false, error: undefined });

    return (
        <GlobalContext.Provider value={{ partyData, partyDispatcher }}>
            {children}
        </GlobalContext.Provider>
    )
}