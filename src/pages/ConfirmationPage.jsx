import React from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";


const ConfirmationPage = () => {
  
  const { cartItems } = useCart();
  const location = useLocation();
  const { userInfo, total, subtotal, taxes, shipping } = location.state || {};
  if (!userInfo || !total || !subtotal) {
    return <p>Erreur : informations de commande manquantes.</p>;
  }
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 5);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 10);

  const formatDate = (date) =>
    date.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className={styles.confirmationContainer}>
      <h1>Merci pour votre commande !</h1>
      <p>Un reçu a été envoyé à votre adresse courriel : <strong>{userInfo?.email}</strong></p>
      <p>
        Votre commande sera livrée entre le <strong>{formatDate(deliveryStart)}</strong> et le <strong>{formatDate(deliveryEnd)}</strong>.
      </p>

      <div className={styles.section}>
        <h2>Informations de livraison</h2>
        <p><strong>Nom :</strong> {userInfo?.name}</p>
        <p><strong>Adresse :</strong> {userInfo?.address}</p>
      </div>

      <div className={styles.section}>
        <h2>Articles commandés</h2>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.itemRow}>
            <img src={item.image} alt={item.name} className={styles.thumbnail} />
            <div>
              <p><strong>{item.name}</strong></p>
              <p>Couleur: {item.color} | Taille: {item.size}</p>
              <p>Quantité: {item.quantity}</p>
              <p>Prix unitaire: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Résumé de la commande</h2>
        <p>Sous-total : ${subtotal.toFixed(2)}</p>
        <p>Taxes (13%) : ${taxes.toFixed(2)}</p>
        <p>Livraison : {shipping === 0 ? "Gratuite" : `$${shipping}`}</p>
        <hr />
        <p className={styles.total}><strong>Total payé : ${total.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
