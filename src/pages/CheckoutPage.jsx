import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({firstName: "", lastName: "", email: "", address: "", city: "", province: "", postalCode: "", country: "Canada",});


  const [cardNumber, setCardNumber] = useState("");
  const [errors, setErrors] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.13;
  let shipp; 
  if (subtotal > 100) {
    shipp = 0;
  } 
  else {
    shipp = 15; 
  }
  const total = subtotal + taxes + shipp;

  const validateCard = () => /^\d{16}$/.test(cardNumber);
  const validateExpiryDate = () => {

    if (!/^\d{4}$/.test(expiryDate)) return false;

    const month = parseInt(expiryDate.slice(0, 2), 10);
    return month >= 1 && month <= 12;

  };

  const validateCVV = () => /^\d{3}$/.test(cvv);

  const submit = (e) => {
    e.preventDefault();

    if (!validateCard()) {
      setErrors("Numéro de carte invalide. Il doit contenir 16 chiffres.");
      return;
    }
    if (!validateExpiryDate()) {
      setErrors("Date d'expiration invalide. Utilisez le format MMYY avec un mois entre 01 et 12.");
      return;
    }
    if (!validateCVV()) {
      setErrors("Code de sécurité invalide. Il doit contenir exactement 3 chiffres.");
      return;
    }
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.address || !userInfo.city || !userInfo.province || !userInfo.postalCode || !userInfo.country ) {
      setErrors("Veuillez remplir tous les champs personnels.");
      return;
    }

    const name = `${userInfo.firstName} ${userInfo.lastName}`;
    setErrors("");
    clearCart();

    navigate("/confirmation", {
      state: {
        userInfo: { ...userInfo, name },
        total,
        subtotal,
        taxes,
        shipp,
        orderedItems: cartItems,
      },
    });
  };
  const getStockSize = (item) => {
    if (item.stock && item.size && item.stock[item.size] !== undefined) {
      return item.stock[item.size];
    }
    return 0;
  };

  return (

    <div className={styles.checkoutContainer}>
      <div className={styles.leftSide}>

        {/* Etape 1: Article */}
        <div className={styles.section}>

          <h2>1. Vos articles</h2>

          {cartItems.map((item, index) => {
            const stockDisponible = getStockSize(item);

            return (

              <div key={index} className={styles.productRow}>
                <img src={item.image} alt={item.name} className={styles.thumbnail}/>
                <div>
                  <p>{item.name}</p>
                  <p>Couleur: {item.color}</p>
                  <p>Taille: {item.size}</p>
                  <label>
                    Quantité:
                    <input type="number" min="1" max={stockDisponible} value={item.quantity} onChange={(e) => {
                        const newQty = parseInt(e.target.value);
                        if (newQty <= stockDisponible) {
                          updateQuantity(index, newQty);
                        } 
                        else {
                          alert(`Stock limité : ${stockDisponible} disponible pour cette taille.`);
                        }
                      }}
                      className={styles.quantityInput}
                    />
                  </label>

                  <p style={{ fontSize: "0.8rem" }}>Stock dispo : {stockDisponible}</p>

                  <p>Prix: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className={styles.actions}>
                  <button onClick={() => navigate(`/produit/${item.id}`)}>Modifier</button>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(index)}>X</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Etape 2: Informations personnelles */}
        <div className={styles.section}>
          <h2>2. Informations personnelles</h2>

          <div className={styles.addressGrid}>
            <input type="text" placeholder="Prénom *" className={styles.inputField} value={userInfo.firstName} 
              onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
              required
            />
            <input type="text" placeholder="Nom de famille *" className={styles.inputField} value={userInfo.lastName}
              onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
              required
            />
            <input type="email" placeholder="Courriel *" className={`${styles.inputField} ${styles.fullWidth}`} value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              required
            />

            <input type="text" placeholder="Adresse 1 *" className={`${styles.inputField} ${styles.fullWidth}`} value={userInfo.address}
              onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
              required
            />
            <input type="text" placeholder="Adresse 2 (facultatif)" className={`${styles.inputField} ${styles.fullWidth}`}/>

            <input type="text" placeholder="Ville *" className={styles.inputField} value={userInfo.city}
              onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
              required
            />
            <input type="text" placeholder="Province *" className={styles.inputField} value={userInfo.province}
              onChange={(e) => setUserInfo({ ...userInfo, province: e.target.value })}
              required
            />
            <input type="text" placeholder="Code postal *" className={styles.inputField} value={userInfo.postalCode}
              onChange={(e) => setUserInfo({ ...userInfo, postalCode: e.target.value })}
              required
            />
            <input type="text" placeholder="Pays *" className={styles.inputField} value={userInfo.country}
              onChange={(e) => setUserInfo({ ...userInfo, country: e.target.value })}
              required
            />
          </div>

        </div>

        {/* Etape 3: Paiement */}

        <div className={styles.section}>

          <h2>3. Paiement</h2>

          <div className={styles.paymentSection}>
            <input type="text" placeholder="Numéro De Carte De Crédit" className={styles.cardNumberInput} value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              maxLength={16}
              required
            />

            <div className={styles.expiryCvvRow}>
              <input type="text" placeholder="MM/AA" className={styles.expiryInput} value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, ""))}
                maxLength={4}
                required
              />
              <div className={styles.cvvInputWithIcon}>
                <input type="text" placeholder="Code De Sécurité" className={styles.cvvInput} value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  maxLength={3}
                  required
                />
              </div>
            </div>

          </div>

            {errors && <p className={styles.error}>{errors}</p>}
            <button onClick={submit}>Confirmer l'achat</button>
          </div>
        </div>

      {/* Résumé à droit */}
      <div className={styles.rightSide}>
        <h3>Résumé</h3>
        <p>Sous-total : ${subtotal.toFixed(2)}</p>
        <p>Taxes (13%) : ${taxes.toFixed(2)}</p>
        <p>Livraison : {shipp === 0 ? "Gratuite" : `$${shipp.toFixed(2)}`}</p>
        <hr />
        <p className={styles.total}><strong>Total : ${total.toFixed(2)}</strong></p>
      </div>

    </div>
  );
};

export default CheckoutPage;
