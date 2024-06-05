import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom/dist';

import RootLayout from './layouts/RootLayout';

import Home from './routes/Home';
import AddCategory from './routes/AddCategory';
import AddProduct from './routes/AddProduct';
import CustomerPurchases from './routes/CustomerPurchases';
import EditProduct from './routes/EditProduct';
import CreatePurchase from './routes/CreatePurchase';
import CategoryProducts from './routes/CategoryProducts';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='add-category' element={<AddCategory />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='category/:category' element={<CategoryProducts />} />
        <Route path='edit-product/:id' element={<EditProduct />} />
        <Route path='customer-purchases' element={<CustomerPurchases />} />
        <Route path='create-purchase' element={<CreatePurchase />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;