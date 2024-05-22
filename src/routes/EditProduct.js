import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useProductContext } from '../hooks/UseProductContext';
import { getDownloadURL } from "firebase/storage";

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        quantity: 0,
        price: 0
    });

    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const { id } = useParams();
    const { uploadImg, getProduct, editProduct } = useProductContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();

        if (!img) {
            alert("Please select an image.");
            return;
        }

        setLoading(true);

        try {
            const imgName = img.name.split('.')[0];
            const imgExt = img.name.split('.')[1];

            const snapshot = await uploadImg(imgName, imgExt, img);
            const imageUrl = await getDownloadURL(snapshot.ref);

            const newProduct = { ...product, image: imageUrl };

            await editProduct(id, newProduct);
            setProduct({ name: "", image: "", quantity: 0, price: 0 });
            setImg(null);
            navigate('/');
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const fetchProductDetails = async () => {
            if (id) {
                const productDetails = await getProduct(id);
                setProduct(productDetails);
            }
        }

        fetchProductDetails();
    }, [id, getProduct]);

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
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image URL</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImg(e.target.files[0])}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Choose an image"
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
                        {loading ? 'Loading...' : 'Edit Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProduct;
