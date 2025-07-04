import React, { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [onlySales, setOnlySales] = useState(false);
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));
  const allGenders = Array.from(new Set(products.map((p) => p.genre)));

  function tColor(color) {
    const prevColo = selectedColors;
    const colorIsSelected = prevColo.includes(color);

    if (colorIsSelected) {
      const newColors = [];
      for (let i = 0; i < prevColo.length; i++) {
        if (prevColo[i] !== color) {
          newColors.push(prevColo[i]);
        }
      }
      setSelectedColors(newColors);
    } else {
      const newColors = [];
      for (let i = 0; i < prevColo.length; i++) {
        newColors.push(prevColo[i]);
      }
      newColors.push(color);
      setSelectedColors(newColors);
    }
  }
  const filteredProducts = products.filter((product) => {

    const matchColor = selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color));
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGender = selectedGender === "" || product.genre === selectedGender;
    const matchSale = !onlySales || product.sale === true;
    return matchColor && matchSearch && matchGender && matchSale;
  });


  return (

    <div className={styles.container}>
      <h1 className={styles.title}>Nos Produits</h1>
      {/*filtres */}
      <div className={styles.content}>
        <aside className={styles.sidebar}>

          <h3>Recherche</h3>
          <input type="text" placeholder="Rechercher" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput}/>

        <h3>Offres spéciales</h3>

        <div>
          <label>
            <input type="checkbox" checked={onlySales} onChange={() => setOnlySales(!onlySales)} />Produits en solde</label>
        </div>

        <h3>Filtrer par couleur</h3>

        {allColors.map((color) => (
          <div key={color}>
            <label>
              <input type="checkbox" checked={selectedColors.includes(color)} onChange={() => tColor(color)}/>{color}</label>
          </div>
        ))}

        <h3>Filtrer par genre</h3>
        {allGenders.map((gender) => (
          <div key={gender}>
            <label>
              <input type="radio" name="gender" value={gender} checked={selectedGender === gender} onChange={() => setSelectedGender(gender)}/>
              {gender}
            </label>
          </div>
          ))}
        <div>
          <label>
            <input type="radio" name="gender" value="" checked={selectedGender === ""} onChange={() => setSelectedGender("")} />
            Tous
          </label>
        </div>
        
        </aside>
        {/* affichage des produit*/}
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
