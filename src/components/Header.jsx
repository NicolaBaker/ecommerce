import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./Header.module.css";
import logo from "../img/NAL.png";

const Header = () => {
  const { openCart, cartItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
         <Link to="/">
            <img src={logo} alt="New All" className={styles.logoImage} />
          </Link>
      </div>


      {/* Menu des liens */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Accueil</Link>
        <Link to="/produits" className={styles.link}>Produits</Link>
      </nav>

      <div className={styles.cartSection}>
        <div className={styles.cartButton} onClick={openCart}>

          <span role="img" aria-label="cart"><img src="https://www.pngplay.com/wp-content/uploads/4/Shopping-Cart-PNG-Free-File-Download.png" alt="Panier"/></span>
          <span className={styles.cartCount}>{cartItems.length}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
