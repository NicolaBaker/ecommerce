const FacetedSearch = () => {
  return (
    <div>
      <label>Filtrer par taille:</label>
      <select>
        <option>Toutes</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
      </select>

      <label>Filtrer par couleur:</label>
      <select>
        <option>Toutes</option>
        <option>Rouge</option>
        <option>Bleu</option>
        <option>Noir</option>
      </select>
    </div>
  );
};

export default FacetedSearch;
