import styles from "./Home.module.css";
import Survey from "../components/Survey";
import { Link } from "react-router-dom";
import img1 from '../img/nb1.jpg';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* promo */}
      <section className={styles.promoSection} >
        <h2>🔥 SOLDES D'ÉTÉ - Jusqu’à 50 % de rabais 🔥</h2>
        <p>Profitez de nos meilleures offres sur nos vêtements.<strong> Jusqu'au 29 juillet seulement.</strong></p>
        <Link to="/produits"><button className={styles.secondaryBtn}>Voir les offres</button></Link>
      </section>

      {/* Section héro */}
      <section className={styles.heroAceul} style={{ backgroundImage: `url(${img1})` }}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Performance. Style. Confiance.</h1>
          
          <br />
          <br />
          <Link to="/produits"><button className={styles.cta}>Magasinez maintenant</button></Link>

        </div>
      </section>

      {/* Avantage */}
      <section className={styles.infoSection} >
        <h2>Pourquoi choisir notre marque ?</h2>

        <ul className={styles.benefitsList}>
          <li>Chez nous, nous croyons que chaque vêtement raconte une histoire et on espère que la vôtre commence ici.</li>
          <li>Vêtements conçus et fabriqués au Canada, dans le respect des travailleurs</li>
          <li>Aucune exploitation, nos produits sont fabriqués par des adultes rémunérés équitablement</li>
          <li>Matières écoresponsables, coton biologique et tissus recyclés quand possible</li>
          <li>Design simple, moderne et pensé pour durer</li>
          <li>Production en petite quantité pour limiter le gaspillage</li>
          <li>Chaque chandail et t-shirt est pensé avec conscience, pour un impact positif</li>
          <li>J’ai conçu cette marque avec une idée simple, offrir des vêtements qui ont du sens.</li>
        </ul>
      </section>

      {/* Sondage */}
      <section className={styles.surveySection}>
        <h2>Votre avis compte !</h2>
        <p>Comment évaluez-vous votre expérience sur notre site ?</p>


        <Survey />
      </section>
    </div>
  );
};

export default Home;
