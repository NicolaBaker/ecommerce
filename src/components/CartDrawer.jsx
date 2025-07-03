import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./CartDrawer.module.css";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { isCartOpen, cartItems, updateQuantity, removeFromCart, closeCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const goToProduct = (item) => {
    closeCart(); 
    navigate(`/produit/${item.id}`, { state: { ...item } }); // passer les infos en state
  };

  return (
    <div className={styles.drawer}>
      <button className={styles.closeBtn} onClick={closeCart}>X</button>
      <h2>Mon Panier</h2>
      {cartItems.length === 0 && <p>Votre panier est vide</p>}
      {cartItems.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <img
            src={item.image}
            alt={item.name}
            className={styles.image}
            style={{cursor: 'pointer'}}
            onClick={() => goToProduct(item)}
          />
          <div className={styles.details}>
            <p
              style={{cursor: 'pointer', textDecoration: 'underline'}}
              onClick={() => goToProduct(item)}
            >
              {item.name}
            </p>
            <p>Couleur: {item.color}</p>
            <p>Taille: {item.size}</p>
            <p>Prix: ${item.price}</p>
            <div>
              <label>Quantité: </label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                className={styles.quantityInput}
              />
            </div>
          </div>
          <button className={styles.removeBtn} onClick={() => removeFromCart(index)}>X</button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <button
          className={styles.checkoutBtn}
          onClick={() => {
            closeCart();  
            navigate("/paiement");
          }}
        >Passer la commande
        </button>
      )}
    </div>
  );
};

export default CartDrawer;
