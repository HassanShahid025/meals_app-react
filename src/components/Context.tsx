import { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { IAppContext } from "../type";

const AppContext = createContext<IAppContext | null>(null);

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

export const AppProvider = ({ children }: any) => {
  const [meals, setMeals] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  const getFavoritesFromLocalStorage = () => {
    let favorites:any = localStorage.getItem('favorites')
    if(favorites){
      favorites = JSON.parse(favorites)
    }
    else{
      favorites = []
    }

    return favorites
  }

  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

  const fetchMeals = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const selectMeal = (idMeal: string, favoriteMeal:boolean) => {
    let meal;
    if(favoriteMeal){
      meal = favorites.find((item: any) => item.idMeal === idMeal);
    }
    else{
      meal = meals.find((item: any) => item.idMeal === idMeal);
    }
    
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addtoFavorite = (idMeal:string) => {
    let meal = meals.find((item: any) => item.idMeal === idMeal);
    const alreadyFavorite = favorites.find((item: any) => item.idMeal === idMeal);

    if(alreadyFavorite){
      removeFomFavorite(idMeal)
    }

    else{
      const updatedFavorite = [...favorites, meal]
      setFavorites(updatedFavorite)
    }
  }

  const removeFomFavorite = (idMeal:string) => {
    const updatedFavorite = favorites.filter((item:any) => item.idMeal !== idMeal)
    setFavorites(updatedFavorite)
  }

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  const home = () => {
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addtoFavorite,
        removeFomFavorite,
        favorites,
        home
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
