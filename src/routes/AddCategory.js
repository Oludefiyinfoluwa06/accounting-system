import React, { useState } from 'react';
import { useProductContext } from '../hooks/UseProductContext';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const { addCategory, loading } = useProductContext();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await addCategory({ name: category });
            setCategory('');
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category.");
        }
    };

    return (
        <div>
            <form onSubmit={handleAddCategory} className="mt-[30px] max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category Name</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Add Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
