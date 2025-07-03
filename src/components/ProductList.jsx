
import React from "react";
import ProductCard from "../components/ProductCard";
import styles from "./ProductList.module.css";

const products = [
  {
    id: 1,
    name: "UA Sonic 7",
    description: "Women's Running Shoes",
    price: 130,
    image: "https://underarmour.scene7.com/is/image/Underarmour/3028003-001_DEFAULT"
  },
  {
    id: 2,
    name: "UA Street Mirage",
    description: "Women's Shoes",
    price: 90,
    image: "https://underarmour.scene7.com/is/image/Underarmour/3028379-003_DEFAULT"
  },
  {
    id: 3,
    name: "UA Phantom 4",
    description: "Women's Shoes",
    price: 150,
    image: "https://underarmour.scene7.com/is/image/Underarmour/3027594-300_DEFAULT"
  },
];

const ProductList = () => {
  return (
    <div className={styles.listContainer}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
