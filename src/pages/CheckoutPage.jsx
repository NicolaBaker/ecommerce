// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart(); // 👈 ajoute update & remove
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", email: "", address: "" });
  const [card, setCard] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.13;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + taxes + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: {
        userInfo,
        total,
        subtotal,
        taxes,
        shipping,
      },
    });
  };


  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.leftSide}>
        {/* Étape 1: Produits */}
        <div className={styles.section}>
          <h2>1. Vos articles</h2>
          {cartItems.map((item, index) => (
            <div key={index} className={styles.productRow}>
              <img src={item.image} alt={item.name} className={styles.thumbnail} />
              <div>
                <p>{item.name}</p>
                <p>Couleur: {item.color}</p>
                <p>Taille: {item.size}</p>
                <label>
                  Quantité:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    className={styles.quantityInput}
                  />
                </label>
                <p>Prix: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => navigate(`/produit/${item.id}`)}>Modifier</button>
                <button className={styles.removeBtn} onClick={() => removeFromCart(index)}>X</button>
              </div>
            </div>
          ))}
        </div>

        {/* Étape 2: Info utilisateur */}
        <div className={styles.section}>
          <h2>2. Informations personnelles</h2>
          <input
            type="text"
            placeholder="Nom"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Courriel"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Adresse"
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            required
          />
        </div>

        {/* Étape 3: Carte de crédit */}
        <div className={styles.section}>
          <h2>3. Paiement</h2>
          <input
            type="text"
            placeholder="Carte de crédit"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            required
          />
          <button onClick={handleSubmit}>Confirmer l'achat</button>
        </div>
      </div>

      {/* Résumé */}
      <div className={styles.rightSide}>
        <h3>Résumé</h3>
        <p>Sous-total : ${subtotal.toFixed(2)}</p>
        <p>Taxes (13%) : ${taxes.toFixed(2)}</p>
        <p>Livraison : {shipping === 0 ? "Gratuite" : `$${shipping}`}</p>
        <hr />
        <p className={styles.total}><strong>Total : ${total.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};

export default CheckoutPage;
