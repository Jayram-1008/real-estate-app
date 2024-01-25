import { createContext, useContext } from "react";

const MyContext = createContext();

export const useMycontext = () => {
    return useContext(MyContext)
}

export const MyContextProvider = MyContext.Provider;