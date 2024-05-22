import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export const useProductContext = () => useContext(ProductContext);