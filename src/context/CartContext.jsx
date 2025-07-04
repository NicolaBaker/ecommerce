import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {

    setCartItems((prev) => {

      // Vérifier si le produit existe déjà

      const existingIndex = prev.findIndex((p) =>
          p.id === item.id &&
          p.color === item.color &&
          p.size === item.size
      );
      if (existingIndex >= 0) {

        // Si existe augmenter la quantité
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
  
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index, quantity) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };
  const clearCart = () => setCartItems([]);

  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  return (
    <CartContext.Provider value={{isCartOpen, cartItems, addToCart, updateQuantity, removeFromCart, clearCart, closeCart, openCart,}}>{children}</CartContext.Provider>
  );
};
