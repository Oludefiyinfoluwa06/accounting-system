import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useProductContext } from '../hooks/UseProductContext';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        quantity: 0,
        price: 0
    });

    const [loading, setLoading] = useState(false);

    const { addProduct } = useProductContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const newProduct = { ...product };
            await addProduct(newProduct);
            setProduct({ name: "", quantity: 0, price: 0 });
            navigate('/');
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Header title='Add Product' subTitle='Fill in the form below to add a product' />

            <form onSubmit={handleAddProduct} className="mt-[30px] max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
