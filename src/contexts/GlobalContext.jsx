import { createContext, useState } from "react";
import companyData from '../data/companyData';
import partyData from '../data/partyData';
import itemData from '../data/itemData';
import dynamicConfigData from '../data/dynamicConfigData';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    let [parties, setParties] = useState(() => {
        const localData = localStorage.getItem("parties");
        if (!localData)
            localStorage.setItem("parties", JSON.stringify(partyData));
        return localData ? JSON.parse(localData) : partyData;
    });
    let [companies, setCompanies] = useState(() => {
        const localData = localStorage.getItem("companies");
        if (!localData)
            localStorage.setItem("companies", JSON.stringify(companyData));
        return localData ? JSON.parse(localData) : companyData;
    });
    let [items, setItems] = useState(() => {
        const localData = localStorage.getItem("items");
        if (!localData)
            localStorage.setItem("items", JSON.stringify(itemData));
        return localData ? JSON.parse(localData) : itemData;
    });
    let [dynamicConfig, setDynamicConfig] = useState(() => {
        const localData = localStorage.getItem("dynamicConfig");
        if (!localData)
            localStorage.setItem("dynamicConfig", JSON.stringify(dynamicConfigData));
        return localData ? JSON.parse(localData) : dynamicConfigData;
    });

    const refreshPartyData = () => {
        console.log("party data Refereshed")
    }

    return (
        <GlobalContext.Provider value={{ parties, setParties, companies, setCompanies, items, setItems, dynamicConfig, setDynamicConfig, refreshPartyData }}>
            {children}
        </GlobalContext.Provider>
    )
}