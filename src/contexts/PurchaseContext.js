import { createContext } from "react";

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
    const addPurchase = () => {

    }

    const getPurchases = () => {

    }

    const values = {
        addPurchase,
        getPurchases
    }
    
    return (
        <PurchaseContext.Provider value={values}>
            {children}
        </PurchaseContext.Provider>
    )
}