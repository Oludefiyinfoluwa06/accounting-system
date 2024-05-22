import AllPurchases from "../components/AllPurchases";
import Header from "../components/Header";

const CustomerPurchases = () => {
    return (
        <div>
            <Header title='All Purchases' subTitle='View and create purchases for customers' />

            <AllPurchases />
        </div>
    );
}

export default CustomerPurchases;