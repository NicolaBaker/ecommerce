
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/produit/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <div className={styles.quickAdd}>
        <button aria-label="Ajouter au panier">🛒</button>
      </div>

      <div className={styles.wishlist}>
        <input type="checkbox" id={`fav-${product.id}`} />
        <label htmlFor={`fav-${product.id}`}>❤️</label>
      </div>

      <h3 className={styles.title}>
        <Link to={`/produit/${product.id}`}>{product.name}</Link>
        <br />
        <span className={styles.subtitle}>{product.description}</span>
      </h3>

      <div className={styles.price}>${product.price}</div>
    </div>
  );
};

export default ProductCard;
