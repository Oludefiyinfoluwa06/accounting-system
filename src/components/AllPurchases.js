import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePurchaseContext } from '../hooks/UsePurchaseContext';
import { images } from '../assets/constants';
import { useReactToPrint } from 'react-to-print';

const AllPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const { getPurchases, deleteAllPurchases } = usePurchaseContext();
    const componentRef = useRef();

    useEffect(() => {
        const fetchPurchases = async () => {
            const purchases = await getPurchases();
            setPurchases(purchases);
        };

        fetchPurchases();
    }, [getPurchases]);

    const handleDeleteAll = async () => {
        await deleteAllPurchases();
        setPurchases([]);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const totalAmount = purchases.reduce((total, purchase) => parseFloat(total) + parseFloat(purchase.price), 0);

    const ReceiptDocument = React.forwardRef((props, ref) => (
        <div
            ref={ref}
            style={{
                padding: '10px',
                fontSize: '10px',
                width: '80mm',
                height: 'auto',
                margin: '0 auto',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                border: '1px solid #ddd',
                borderRadius: '5px',
                wordWrap: 'break-word',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '14px', marginBottom: '10px' }}>Endess Laundry</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '10px', marginBottom: '2px' }}>Shop 2, Acacia Grove Estate,</p>
                    <p style={{ fontSize: '10px', marginBottom: '2px' }}>Wuya, Abuja</p>
                    <p style={{ fontSize: '10px', marginBottom: '5px' }}>Tel: 09158983744, 07061229354</p>
                </div>
                <hr style={{ borderBottom: '1px solid black', margin: '5px 0' }} />
                <h2 style={{ fontSize: '14px', marginBottom: '10px' }}>Purchase Receipt</h2>
                <div style={{ display: 'table', width: '100%', margin: '10px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '33.33%', borderBottom: '1px solid #000', padding: '2px', backgroundColor: '#f0f0f0' }}>
                            <p style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center', wordWrap: 'break-word' }}>Item</p>
                        </div>
                        <div style={{ width: '33.33%', borderBottom: '1px solid #000', padding: '2px', backgroundColor: '#f0f0f0' }}>
                            <p style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center', wordWrap: 'break-word' }}>Quantity</p>
                        </div>
                        <div style={{ width: '33.33%', borderBottom: '1px solid #000', padding: '2px', backgroundColor: '#f0f0f0' }}>
                            <p style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center', wordWrap: 'break-word' }}>Amount</p>
                        </div>
                    </div>
                    {purchases.map((purchase) => (
                        <div key={purchase.id} style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '33.33%', padding: '2px', wordWrap: 'break-word' }}>
                                <p style={{ fontSize: '10px', textAlign: 'center', wordWrap: 'break-word' }}>{purchase.name}</p>
                            </div>
                            <div style={{ width: '33.33%', padding: '2px', wordWrap: 'break-word' }}>
                                <p style={{ fontSize: '10px', textAlign: 'center', wordWrap: 'break-word' }}>{purchase.quantity}</p>
                            </div>
                            <div style={{ width: '33.33%', padding: '2px', wordWrap: 'break-word' }}>
                                <p style={{ fontSize: '10px', textAlign: 'center', wordWrap: 'break-word' }}>₦ {purchase.price}</p>
                            </div>
                        </div>
                    ))}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', borderTop: '1px solid #000', paddingTop: '5px' }}>
                        <div style={{ width: '66.66%', padding: '2px', wordWrap: 'break-word' }}>
                            <p style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center', wordWrap: 'break-word' }}>Total</p>
                        </div>
                        <div style={{ width: '33.33%', padding: '2px', wordWrap: 'break-word' }}>
                            <p style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center', wordWrap: 'break-word' }}>₦ {totalAmount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div>
            {purchases.length <= 0 ? (
                <div className="flex items-center justify-center gap-2 flex-col my-[20px]">
                    <img src={images.emptyCart} alt="Empty shelf" className="sm:w-[300px] w-[250px]" />
                    <p className="text-[24px]">There has been no purchases</p>
                    <Link to='/create-purchase' className="px-[20px] py-2 rounded-[50px] bg-blue-500 text-white">Create a purchase</Link>
                </div>
            ) : (
                <div>
                    <div className="p-6 overflow-x-auto">
                        <table className="min-w-full bg-white mb-[30px]">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Product Name</th>
                                    <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                                    <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {purchases.map((purchase) => (
                                    <tr key={purchase.id} className="bg-gray-100">
                                        <td className="w-1/3 py-3 px-4">{purchase.name}</td>
                                        <td className="w-1/3 py-3 px-4">{purchase.quantity}</td>
                                        <td className="w-1/3 py-3 px-4">₦ {purchase.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex items-center justify-start gap-[20px] sm:flex-row flex-col">
                            <button
                                onClick={handlePrint}
                                className="bg-blue-500 px-[20px] py-[8px] text-white sm:w-[200px] w-full rounded-sm"
                            >
                                Print Receipt
                            </button>

                            <button
                                className="bg-blue-500 px-[20px] py-[8px] text-white sm:w-[200px] w-full rounded-sm"
                                onClick={handleDeleteAll}
                            >
                                Delete purchases
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'none' }}>
                        <ReceiptDocument ref={componentRef} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPurchases;
