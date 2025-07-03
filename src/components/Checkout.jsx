import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    carte: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation");
  };

  return (
    <div className={styles.checkout}>
      <h2>Paiement</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre courriel"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="carte"
          placeholder="Numéro de carte (fictif)"
          value={form.carte}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirmer l'achat</button>
      </form>
    </div>
  );
};

export default Checkout;
