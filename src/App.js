import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom/dist';

import RootLayout from './layouts/RootLayout';

import Home from './routes/Home';
import AddProduct from './routes/AddProduct';
import CustomerPurchases from './routes/CustomerPurchases';
import EditProduct from './routes/EditProduct';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='edit-product/:id' element={<EditProduct />} />
        <Route path='customer-purchases' element={<CustomerPurchases />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;