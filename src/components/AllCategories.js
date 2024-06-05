import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { useProductContext } from '../hooks/UseProductContext';
import { images } from '../assets/constants';
import Swal from 'sweetalert2';

const AllCategories = () => {
    const { getCategories, deleteCategory } = useProductContext();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
            setLoading(false);
        };

        fetchCategories();
    }, [getCategories]);

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName}`);
    };

    const handleDeleteCategory = async (categoryId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this category. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(categoryId);
                setCategories(categories.filter(category => category.id !== categoryId));
                Swal.fire('Deleted!', 'The category has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting category:', error);
                Swal.fire('Error', 'Failed to delete category.', 'error');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-between"
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <h2 className="text-xl font-bold text-gray-700">{category.name}</h2>
                            <FaTrash className="cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(category.id);
                            }} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2 flex-col my-[20px]">
                    <img src={images.emptyStore} alt="Empty shelf" className="sm:w-[300px] w-[250px]" />
                    <p className="text-[24px]">You have not added any category, therefore no product</p>
                    <Link to='/add-category' className="px-[20px] py-2 rounded-[50px] bg-blue-500 text-white">Add category</Link>
                </div>
            )}
        </div>
    );
};

export default AllCategories;
