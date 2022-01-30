import { createContext } from "react";
import defaultAppConfig from "../utils/getAppConfig";

export const ConfigContext = createContext();

export const ConfigContextProvider = ({ children }) => {
    return (
        <ConfigContext.Provider value={defaultAppConfig}>
            {children}
        </ConfigContext.Provider>
    )
}