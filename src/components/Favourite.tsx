import { BsEar } from "react-icons/bs";
import { useGlobalContext } from "./Context";

export const Favourite = () => {
  const { favorites, removeFomFavorite, selectMeal } = useGlobalContext()!;
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((item: any) => {
            const { idMeal, strMealThumb: image } = item;

            return (
              <div key={idMeal} className="favorite-item">
                <img src={image} className="img favorites-img" onClick={() => selectMeal(idMeal, true)}/>
                <button
                  className="remove-btn"
                  onClick={() => removeFomFavorite(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
