import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { images } from '../assets/constants';
import { usePurchaseContext } from '../hooks/UsePurchaseContext';

const AllPurchases = () => {
    const [purchases, setPurchases] = useState([]);

    const { getPurchases, deleteAllPurchases } = usePurchaseContext();

    useEffect(() => {
        const fetchPurchases = async () => {
            const purchases = await getPurchases();
            setPurchases(purchases);
        }

        fetchPurchases();
    }, [getPurchases]);
    
    const handleDeleteAll = async () => {
        await deleteAllPurchases();
        setPurchases([]);
    };

    const MyDocument = () => (
        <Document>
            <Page size="A4">
                <View style={styles.container}>
                    <Text style={styles.header}>Purchase Receipt</Text>
                    {purchases.map(purchase => (
                        <View key={purchase.id} style={styles.purchase}>
                            <Text>{purchase.name}</Text>
                            <Text>Quantity: {purchase.quantity}</Text>
                            <Text>Total Amount: ₦{purchase.price}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            {purchases.length <= 0 ? (
                <div className="flex items-center justify-center gap-2 flex-col my-[20px]">
                    <img src={images.emptyCart} alt="Empty shelf" className="sm:w-[300px] w-[250px]" />
                    <p className="text-[24px]">There have been no purchases</p>
                    <Link to='/create-purchase' className="px-[20px] py-2 rounded-[50px] bg-blue-500 text-white">Create a purchase</Link>
                </div>
            ) : (
                <div>
                    <div className="p-6">
                        <table className="min-w-full bg-white mb-[30px]">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Product Name</th>
                                    <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                                    <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {purchases.map(purchase => (
                                    <tr key={purchase.id} className="bg-gray-100">
                                        <td className="w-1/3 py-3 px-4">{purchase.name}</td>
                                        <td className="w-1/3 py-3 px-4">{purchase.quantity}</td>
                                        <td className="w-1/3 py-3 px-4">₦{purchase.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex items-center justify-start gap-[20px]">
                            <PDFDownloadLink
                                document={<MyDocument />}
                                    fileName="purchase_receipt.pdf"
                                    className="bg-blue-500 px-[20px] py-[8px] rounded-[50px] text-white"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download Receipt'
                                }
                            </PDFDownloadLink>
                            
                            <button className="bg-blue-500 px-[20px] py-[8px] rounded-[50px] text-white" onClick={handleDeleteAll}>Delete purchases</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    purchase: {
        marginBottom: 10
    }
});

export default AllPurchases;
