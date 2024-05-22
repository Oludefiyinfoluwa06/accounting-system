import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { usePurchaseContext } from "../hooks/UsePurchaseContext";

const CreatePurchase = () => {
    const [product, setProduct] = useState({
        name: "",
        quantity: 1,
        price: 0
    });

    const [products, setProducts] = useState([]);
    const [selectedProductPrice, setSelectedProductPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { addPurchase, getProducts } = usePurchaseContext();

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };

        fetchProducts();
    }, [getProducts]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            const selectedProduct = products.find(p => p.name === value);
            const price = selectedProduct ? selectedProduct.price : 0;

            setProduct({ ...product, name: value, price: price });
            setSelectedProductPrice(price);
        } else if (name === "quantity") {
            const quantity = parseInt(value, 10);
            setProduct({ ...product, quantity: quantity, price: selectedProductPrice * quantity });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleCreatePurchase = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await addPurchase(product);
            setProduct({ name: "", quantity: 1, price: 0 });
            navigate('/customer-purchases');
        } catch (error) {
            console.error("Error creating purchase:", error);
            alert("Failed to create purchase.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header title='Create a purchase' subTitle='Create a purchase and print receipt for the buyer' />

            <form onSubmit={handleCreatePurchase} className="mt-[30px] max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
                    <select
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="" disabled>Select product name</option>
                        {products.map(product => (
                            <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                    </select>
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
                        min="1"
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
                        readOnly
                        required
                    />
                </div>
                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Create purchase'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePurchase;