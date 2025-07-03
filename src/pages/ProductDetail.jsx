import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import products from "../data/products";
import styles from "./ProductDetail.module.css";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { addToCart, openCart } = useCart();
  const { id } = useParams();
  const location = useLocation();
  const product = products.find((p) => p.id === id);

  // Valeurs initiales par défaut
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Si on vient du panier avec state, préremplir
    if (location.state) {
      if (location.state.color) setSelectedColor(location.state.color);
      if (location.state.size) setSelectedSize(location.state.size);
      if (location.state.quantity) setQuantity(location.state.quantity);
    }
  }, [location.state]);

  if (!product) return <p>Produit introuvable</p>;

  const availableSizes = [
    "5", "5.5", "6", "6.5", "7", "7.5",
    "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"
  ];

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    });
    if (openCart) openCart();
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.details}>{product.details}</p>
        <p className={styles.price}>${product.price}</p>

        {/* Couleurs */}
        <div className={styles.colorOptions}>
          <h3>Color:</h3>
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ""}`}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Tailles */}
        <div className={styles.sizeOptions}>
          <h3>Size:</h3>
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ""}`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quantité */}
        <div className={styles.quantityContainer}>
          <label>Quantité: </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className={styles.quantityInput}
          />
        </div>

        <button className={styles.addToBag} onClick={handleAddToBag}>
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
