import { useContext } from "react";
import { PurchaseContext } from "../contexts/PurchaseContext";

export const usePurchaseContext = () => useContext(PurchaseContext);