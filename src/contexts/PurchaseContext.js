import { get, push, ref, remove } from "firebase/database";
import { createContext, useState } from "react";
import { db } from "../firebase";

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        const productsRef = ref(db, 'products');
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
            const productsData = snapshot.val();
            return Object.keys(productsData).map(key => ({
            id: key,
            ...productsData[key]
            }));
        } else {
            return [];
        }
    }

    const addPurchase = async (product) => {
        setLoading(true);
        const purchaseRef = ref(db, 'purchases');
        await push(purchaseRef, product);
        setLoading(false);
    }

    const getPurchases = async () => {
        const purchasesRef = ref(db, 'purchases');
        const snapshot = await get(purchasesRef);
        if (snapshot.exists()) {
            const purchasesData = snapshot.val();
            return Object.keys(purchasesData).map(key => ({
            id: key,
            ...purchasesData[key]
            }));
        } else {
            return [];
        }
    }

    const deleteAllPurchases = async () => {
        const purchasesRef = ref(db, 'purchases');
        await remove(purchasesRef);

        console.log('All purchases deleted successfully');
    }

    const values = {
        getProducts,
        addPurchase,
        getPurchases,
        deleteAllPurchases,
        loading
    }
    
    return (
        <PurchaseContext.Provider value={values}>
            {children}
        </PurchaseContext.Provider>
    )
}