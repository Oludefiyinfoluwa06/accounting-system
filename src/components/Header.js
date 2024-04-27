import React, { useState } from 'react';

const Header = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e, isPrice) => {
        if (isPrice) {
            setNewPrice(e.target.value);
        } else {
            setNewItem(e.target.value);
        }
    };

    const addItem = () => {
        if (newItem.trim() !== '' && newPrice.trim() !== '') {
            setItems([...items, { name: newItem.trim(), price: parseFloat(newPrice.trim()) }]);
            setNewItem('');
            setNewPrice('');
        } else {
            setError('Input fields cannot be empty');
            setNewItem('');
            setNewPrice('');
        }
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const generateReceipt = () => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        const receiptItems = items.map((item, index) => `${index + 1}. ${item.name} - ₦ ${item.price.toFixed(2)}`);
        const receipt = `Receipt\n\n${receiptItems.join('\n')}\n\nTotal: ₦ ${total.toFixed(2)}`;
        return receipt;
    };

    const downloadReceipt = () => {
        const receiptContent = generateReceipt();
        const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'receipt.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setItems([]);
    };

    return (
        <div className='flex justify-center items-center min-h-[100vh]'>
            <div className='rounded-lg p-3 shadow-md flex flex-col md:w-[500px] w-[300px]'>
                <h1 className='text-xl font-bold text-center'>LOGO</h1>
                <p className='text-lg text-center'>Track your expenses and get a receipt</p>

                {error && <p className='text-red-500 text-center text-md'>{error}</p>}
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => {
                        handleInputChange(e, false);
                        setError('');
                    }}
                    placeholder="Enter a new item"
                    className='border-b-2 mt-4 outline-none'
                />
                <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => {
                        handleInputChange(e, true);
                        setError('');
                    }}
                    placeholder="Enter the price"
                    className='border-b-2 mt-4 outline-none'
                />
                <button onClick={addItem} className='bg-[#333] mt-3 text-white p-[7px] rounded cursor-pointer'>Add Item</button>
                {items.length !== 0 && (
                    <div className='mt-3'>
                        <p className="text-center text-md">All Expenses</p>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className='flex items-center justify-between'>
                                    <span>
                                        {item.name} - ₦{item.price.toFixed(2)}
                                    </span>
                                    <button className='text-red-500' onClick={() => removeItem(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={downloadReceipt} className={`${items.length === 0 ? 'bg-slate-200 cursor-not-allowed' : 'bg-[#333] cursor-pointer'} mt-3 text-white p-[7px] rounded`} disabled={items.length === 0}>Download Receipt</button>
            </div>
        </div>
    );
}

export default Header;