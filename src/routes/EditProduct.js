import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useProductContext } from '../hooks/UseProductContext';

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        category: ""
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const { id } = useParams();
    const { getProduct, editProduct, getCategories } = useProductContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const newProduct = { ...product };
            await editProduct(id, newProduct);
            setProduct({ name: "", price: 0, category: "" });
            navigate('/');
        } catch (error) {
            console.error("Error editing product:", error);
            alert("Failed to edit product.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (id) {
                const productDetails = await getProduct(id);
                setProduct(productDetails);
            }
        };

        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        };

        fetchProductDetails();
        fetchCategories();
    }, [id, getProduct, getCategories]);

    return (
        <div>
            <Header title='Edit Product' subTitle='Fill in the form below to edit this product' />
            <form onSubmit={handleEditProduct} className="mt-[30px] max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
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
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Edit Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
