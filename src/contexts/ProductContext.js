import { createContext, useState } from "react";
import { db } from "../firebase";
import { get, push, ref, remove, update } from "firebase/database";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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
    };

    const getProduct = async (id) => {
        const productRef = ref(db, `products/${id}`);
        const snapshot = await get(productRef);
        if (snapshot.exists()) {
            return { id, ...snapshot.val() };
        } else {
            throw new Error("Product not found");
        }
    };

    const addProduct = async (product) => {
        setLoading(true);
        const productsRef = ref(db, 'products');
        await push(productsRef, product);
        setLoading(false);
    };

    const editProduct = async (id, updatedProduct) => {
        setLoading(true);
        const productRef = ref(db, `products/${id}`);
        await update(productRef, updatedProduct);
        setLoading(false);
    };

    const deleteProduct = async (id) => {
        const productRef = ref(db, `products/${id}`);
        await remove(productRef);
    };

    const getCategories = async () => {
        const categoriesRef = ref(db, 'categories');
        const snapshot = await get(categoriesRef);
        if (snapshot.exists()) {
            const categoriesData = snapshot.val();
            return Object.keys(categoriesData).map(key => ({
                id: key,
                ...categoriesData[key]
            }));
        } else {
            return [];
        }
    };

    const addCategory = async (category) => {
        setLoading(true);
        const categoriesRef = ref(db, 'categories');
        await push(categoriesRef, category);
        setLoading(false);
    };

    const deleteCategory = async (categoryId) => {
        const categoryRef = ref(db, `categories/${categoryId}`);
        await remove(categoryRef);
    };

    const values = {
        getProducts,
        getProduct,
        addProduct,
        editProduct,
        deleteProduct,
        getCategories,
        addCategory,
        deleteCategory,
        loading
    };

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
};
