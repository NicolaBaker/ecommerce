import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import CartDrawer from "./components/CartDrawer"; 
import { CartProvider, useCart } from "./context/CartContext";

const CartPortal = () => {
  const { isCartOpen, cartItems, closeCart } = useCart();

  return (
    <CartDrawer
      isOpen={isCartOpen}
      cartItems={cartItems}
      onClose={closeCart}
    />
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<ProductPage />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/paiement" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>

        {/* Panier drawer visible sur toutes les pages */}
        <CartPortal />
      </Router>
    </CartProvider>
  );
}

export default App;
