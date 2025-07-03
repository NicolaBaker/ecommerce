import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCart } from "../context/CartContext"; // Assure-toi d'avoir ce contexte

const Header = () => {
  const { openCart, cartItems } = useCart();

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>New All</h1>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Accueil</Link>
        <Link to="/produits" className={styles.link}>Produits</Link>
        <Link to="/paiement" className={styles.link}>Panier</Link>
      </nav>
      <button onClick={openCart}>
        Panier ({cartItems.length})
      </button>
    </header>
  );
};

export default Header;
