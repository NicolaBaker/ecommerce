// src/pages/ProductPage.jsx
import React, { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./ProductPage.module.css";

const ProductPage = () => {

  const [selectedColors, setSelectedColors] = useState([]);


  const allColors = Array.from(
    new Set(products.flatMap((p) => p.colors))
  );

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const filteredProducts =
    selectedColors.length === 0
      ? products
      : products.filter((p) =>
          p.colors.some((color) => selectedColors.includes(color))
        );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nos Produits</h1>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <h3>Filtrer par couleur</h3>
          {allColors.map((color) => (
            <div key={color}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => toggleColor(color)}
                />
                {color}
              </label>
            </div>
          ))}
        </aside>
        <main className={styles.productGrid}>
          {filteredProducts.length === 0 && <p>Aucun produit trouvé.</p>}
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
