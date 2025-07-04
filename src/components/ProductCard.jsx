import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    // La carte qui entour tout le produit
    <div className={styles.card}>

      <Link to={`/produit/${product.id}`} className={styles.imageLink}>

        <div className={styles.imageWrapper}>
          {product.sale && <div className={styles.saleBadge}>En solde</div>}
          <img src={product.image} alt={product.name} className={styles.image}/>
        </div>
      </Link>
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
