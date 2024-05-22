import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { images } from '../assets/constants';
import { useProductContext } from '../hooks/UseProductContext';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const { getProducts, deleteProduct } = useProductContext();

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();

            setProducts(products);
        }

        fetchProducts();
    }, [getProducts]);


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
                deleteProduct(id);

                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "The product is not deleted",
                        icon: "error"
                    });
                }

                window.location.reload();
            });
    }

    return (
        <div>
            {products.length <= 0 ? (
                <div className="flex items-center justify-center gap-2 flex-col mt-[20px]">
                    <img src={images.emptyShelf} alt="Empty shelf" className="w-[300px]" />
                    <p className="text-[24px]">Your store is empty</p>
                    <Link to='/add-product' className="px-[20px] py-2 rounded-[50px] bg-blue-500 text-white">Add product</Link>
                </div>
            ): (
                <div className="flex justify-start gap-[30px] p-[30px]">
                    {products.map(product => (
                        <div key={product.id} className="md:w-[calc(100%/3-40px)] w-full shadow-lg p-3 rounded-md">
                            <img src={product.image} alt={product.name} className="w-full h-[230px] object-cover object-center mb-3" />
                            <p>Product Name: {product.name}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ₦{product.price}</p>

                            <div className="flex items-center flex-wrap md:flex-nowrap justify-start gap-2 mt-3 text-white">
                                <Link to={`/edit-product/${product.id}`} className="py-1 px-3 bg-blue-500 rounded-sm w-full text-center">Edit product</Link>
                                <button className="py-1 px-3 bg-blue-500 rounded-sm w-full" onClick={() => handleDelete(product.id)}>Delete product</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllProducts;