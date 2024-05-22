import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './contexts/ProductContext';
import { PurchaseProvider } from './contexts/PurchaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <PurchaseProvider>
        <App />
      </PurchaseProvider>
    </ProductProvider>
  </React.StrictMode>
);
