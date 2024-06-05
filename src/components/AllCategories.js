import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../hooks/UseProductContext';
import { images } from '../assets/constants';

const AllCategories = () => {
    const { getCategories } = useProductContext();
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

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName}`);
    };

    return (
        <div className="container mx-auto p-4">
            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <h2 className="text-xl font-bold text-gray-700">{category.name}</h2>
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

