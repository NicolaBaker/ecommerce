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
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);

  useEffect(() => {

    if (location.state) {
      if (location.state.color) setSelectedColor(location.state.color);
      if (location.state.size) setSelectedSize(location.state.size);
      
      if (location.state.quantity) setQuantity(location.state.quantity);
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedSize && product?.stock) {
      setStock(product.stock[selectedSize] || 0);
    }
  }, [selectedSize, product]);

  if (!product) return <p>Produit introuvable</p>;

  const addToBag = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    if (stock === 0) {
      alert("Cette taille est en rupture de stock.");
      return;
    }
    if (quantity > stock) {
      alert(`Stock insuffisant. Quantité disponible : ${stock}`);
      return;
    }
    addToCart({id: product.id, name: product.name, image: product.image, price: product.price, color: selectedColor,
      size: selectedSize, quantity: quantity, stock: product.stock,
    });
    if (openCart) openCart();

  };

  return (
    <div className={styles.container}>

      <div>
        <img src={product.image} alt={product.name} className={styles.image} />

        {product.imageG && (

          <img src={product.imageG} alt={`${product.name} - vue 2`} className={styles.image} />
        )}
      </div>

      <div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.details}>{product.details}</p>
        <p className={styles.price}>${product.price}</p>


        {/* Couleur*/}
        <div className={styles.colorOptions}>
          <h3>Couleur:</h3>

          {product.colors.map((color) => (
            <button key={color} onClick={() => setSelectedColor(color)} className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ""}`}>
              {color}
            </button>
          ))}
        </div>


        {/* Tailles */}
        <div className={styles.sizeOptions}>
          <h3>Taille:</h3>
          {product.taille.map((size) => (
            <button key={size} onClick={() => setSelectedSize(size)} className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ""}`}>{size}</button>
          ))}
        </div>
        {selectedSize && (
          <p className={styles.stock}>Stock disponible: <strong>{stock}</strong></p>
        )}

        <div className={styles.quantityContainer}>

          <label>Quantité: </label>
          <input type="number" min="1" max={stock} value={quantity}
            onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, stock))}
            className={styles.quantityInput}
          />
        </div>
        <button className={styles.addToBag} onClick={addToBag}>Ajouter au panier</button>
        
      </div>
    </div>

  );
};

export default ProductDetail;
