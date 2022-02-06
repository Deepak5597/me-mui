import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    let [parties, setParties] = useState(() => {
        const localData = localStorage.getItem("parties");
        return localData ? JSON.parse(localData) : {};
    });

    const refreshPartyData = () => {
        console.log("party data Refereshed")
    }

    return (
        <GlobalContext.Provider value={{ parties, setParties, refreshPartyData }}>
            {children}
        </GlobalContext.Provider>
    )
}