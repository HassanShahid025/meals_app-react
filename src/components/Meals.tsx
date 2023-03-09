import { useGlobalContext } from "./Context";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

export const Meals = () => {
  const { meals, loading, selectMeal, addtoFavorite, favorites } =
    useGlobalContext()!;

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((singleMeal: any) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal!;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              className="img"
              onClick={() => selectMeal(idMeal, false)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addtoFavorite(idMeal)}
              >
                {favorites.find((item: any) => item.idMeal === idMeal) ? <BsHandThumbsUpFill/> : <BsHandThumbsUp/>}
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};
