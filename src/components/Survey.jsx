import { useState } from "react";

const Survey = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [sent, setSent] = useState(false);

  // Quand on clique sur une étoile
  const starClick = (value) => {
    setRating(value);
    setSent(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "0" }}>
      {/* user a envoyé sa note, on dit merci */}
      {sent ? (
        <p>Merci pour votre note de {rating} étoile(s) !</p>
      ) : (
        <>
          {/* Montre les étoiles pour qu’il vote */}
          <div style={{ fontSize: "2rem", marginBottom: "20px" }}>

            {[1, 2, 3, 4, 5].map((star) => (
              
              <span key={star} onClick={() => starClick(star)}
                onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                style={{ cursor: "pointer", color: (hover || rating) >= star ? "#fcc109" : "#e4e5e9",}}>★</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Survey;
