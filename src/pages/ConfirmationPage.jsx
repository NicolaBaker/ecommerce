// src/pages/ConfirmationPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage = () => {
  const location = useLocation();

  // États pour le sondage
  const [hoverRating, setHoverR] = useState(0);
  const [rating, setRating] = useState(0);
  const [showSurvey, setSurvey] = useState(true);

  const { userInfo, total, subtotal, taxes, shipp, orderedItems } = location.state || {};

  if (!userInfo || !total || !subtotal || !orderedItems) {
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

  const handleStarClick = (value) => {
    setRating(value);
    alert(`Merci pour votre note de ${value} étoile(s) !`);
    setSurvey(false);
  };

  return (
    <div className={styles.confirmationContainer}>

      <h1>Merci pour votre commande !</h1>

      <p>Un reçu a été envoyé à votre adresse courriel :{" "}<strong>{userInfo?.email}</strong></p>
      <p>Votre commande sera livrée entre le{" "}<strong>{formatDate(deliveryStart)}</strong> et le{" "}<strong>{formatDate(deliveryEnd)}</strong>.</p>

      <div className={styles.section}>
        <h2>Informations de livraison</h2>
        <p><strong>Nom :</strong> {userInfo?.name}</p>
        <p><strong>Adresse :</strong> {userInfo?.address}, {userInfo?.city},{" "}{userInfo?.province}, {userInfo?.postalCode}, {userInfo?.country}</p>
      </div>

      <div className={styles.section}>

        <h2>Articles commandés</h2>

        {orderedItems.map((item, index) => (

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

        <p>Livraison : {shipp === 0 ? "Gratuite" : `$${shipp.toFixed(2)}`}</p>
        <hr />
        <p className={styles.total}>
          <strong>Total payé : ${total.toFixed(2)}</strong>
        </p>
      </div>

      {/* sondage */}
      {showSurvey && (

        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Comment avez-vous aimé votre achat ?</h2>
            <div className={styles.stars}>

              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color:
                      (hoverRating || rating) >= star ? "#ffc107" : "#e4e5e9",
                  }}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverR(star)}
                  onMouseLeave={() => setHoverR(0)}
                  aria-label={`${star} étoile`}
                >★
                </span>
              ))}
            </div>
            <button onClick={() => setSurvey(false)}>Fermer</button>
          </div>
        </div>

      )}
    </div>
  );

};

export default ConfirmationPage;
