import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./CartDrawer.module.css";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const {isCartOpen, cartItems, updateQuantity, removeFromCart, closeCart } = useCart();

  const navigatr = useNavigate();

  if (isCartOpen === false) {
    return null;
  }

  const goProduct = (item) => {
    closeCart();
    navigatr(`/produit/${item.id}`, { state: { ...item } });
  };

  const getStockSize = (item) => {
    if (item.stock !== undefined && item.size !== undefined && item.stock[item.size] !== undefined) {
      return item.stock[item.size];
    } 
    else {
      return 0;
    }
  };

  return (
    <div className={styles.drawer}>
      <button className={styles.closeBtn} onClick={closeCart}>X</button>
      {/* Panier */}
      <h2>Mon Panier</h2>

      {cartItems.length === 0 && (
        <p>Votre panier est vide</p>
      )}

      {cartItems.map((item, index) => {
        const stockDisponible = getStockSize(item);
        
        // Affichage d’un produit du panier
        return (
          <div key={index} className={styles.cartItem}>
            <img src={item.image} alt={item.name} className={styles.image} style={{ cursor: "pointer" }} onClick={() => goProduct(item)}/>
            <div className={styles.details}>
              <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => goProduct(item)}>{item.name}</p>
              <p>Couleur: {item.color}</p>
              <p>Taille: {item.size}</p>
              <p>Prix: ${item.price}</p>
              <div>
                <label>Quantité: </label>
                <input type="number" min="1" max={stockDisponible} value={item.quantity} onChange={(event) => {
                    const nouvelleQuantite = parseInt(event.target.value);

                    if (nouvelleQuantite <= stockDisponible) {
                      updateQuantity(index, nouvelleQuantite);
                    } 
                    else {
                      alert("Stock limité : " + stockDisponible + " disponible pour cette taille.");
                    }
                  }}
                  className={styles.quantityInput}
                />

                <p style={{ fontSize: "0.8rem" }}>Stock dispo : {stockDisponible}</p>
              </div>
            </div>
            
            {/* Bouton pour retirer l’article du panier */}
            <button className={styles.removeBtn} onClick={() => removeFromCart(index)}>X</button>
          </div>
        );
      })}

      {cartItems.length > 0 && (
        <button className={styles.checkoutBtn} onClick={() => { closeCart(); navigatr("/paiement");}}> Passer la commande</button>
      )}
    </div>
  );
};

export default CartDrawer;
