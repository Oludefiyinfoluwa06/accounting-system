import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../hooks/UseProductContext';
import Header from '../components/Header';
import { images } from '../assets/constants';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const CategoryProducts = () => {
    const { category } = useParams();
    const { getProducts, deleteProduct } = useProductContext();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts = await getProducts();
            const categoryProducts = allProducts.filter(product => product.category === category);
            setProducts(categoryProducts);
            setLoading(false);
        };

        fetchProducts();
    }, [category, getProducts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "bg-bgSuccess text-textSuccess py-[8px] px-[20px] rounded-md mr-3",
                cancelButton: "bg-bgError text-textError py-[8px] px-[20px] rounded-md mr-3"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                setProducts(products.filter(product => product.id !== id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "The product is not deleted",
                    icon: "error"
                });
            }
        });
    }

    return (
        <div>
            <Header title='Products' subTitle={`Here are all the products under ${category}`} />
            <div className="container mx-auto p-4">
                {products.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white mb-[30px]">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Product Name</th>
                                    <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Price</th>
                                    <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {products.map((product) => (
                                    <tr key={product.id} className="bg-gray-100">
                                        <td className="w-1/3 py-3 px-4">{product.name}</td>
                                        <td className="w-1/3 py-3 px-4">₦ {product.price}</td>
                                        <td className="py-3 px-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <FaPencilAlt className="cursor-pointer" onClick={() => navigate(`/edit-product/${product.id}`)} />
                                            <FaTrash className="cursor-pointer" onClick={() => handleDelete(product.id)} />
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 flex-col my-[20px]">
                        <img src={images.emptyStore} alt="Empty shelf" className="sm:w-[300px] w-[250px]" />
                        <p className="text-[24px]">You have not added any category, therefore no product</p>
                        <Link to='/add-product' className="px-[20px] py-2 rounded-[50px] bg-blue-500 text-white">Add product</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;
