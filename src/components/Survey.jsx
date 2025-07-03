import { useState } from "react";

const Survey = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <h3>Votre avis nous intéresse !</h3>
      {sent ? (
        <p>Merci pour votre réponse ! 😊</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Comment avez-vous trouvé le site ?</label>
          <textarea required />
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default Survey;
