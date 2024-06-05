import React from 'react';
import Header from '../components/Header';
import AllCategories from '../components/AllCategories';

const Home = () => {
    return (
        <div>
            <Header title='All Categories' subTitle='Access all the categories in your store' />
            <AllCategories />
        </div>
    );
}

export default Home;
