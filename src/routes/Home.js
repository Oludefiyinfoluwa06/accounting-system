import Header from '../components/Header';
import AllProducts from '../components/AllProducts';

const Home = () => {
    return (
        <div>
            <Header title='All Products' subTitle='Access all the products in your store' />

            <AllProducts />
        </div>
    );
}

export default Home;