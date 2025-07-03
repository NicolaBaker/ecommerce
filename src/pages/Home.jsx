import React from "react";
import styles from "./Home.module.css";
import PromoBanner from "../components/PromoBanner";
import Survey from "../components/Survey";

const Home = () => {
  return (
    <div className={styles.container}>
      <PromoBanner />
      <h1 className={styles.title}>Bienvenue sur notre boutique!</h1>
      <p className={styles.text}>
        Découvrez nos articles en promo. Magasinez dès maintenant!
      </p>
      <a href="/produits">
        <button className={styles.button}>Voir les produits</button>
      </a>
      <Survey />
    </div>
  );
};

export default Home;
