export interface IAppContext {
    meals: any;
    loading: boolean,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    fetchRandomMeal: () => void;
    showModal : boolean;
    selectMeal: (idMeal: string, favoriteMeal: boolean) => void
    selectedMeal: any;
    closeModal: () => void;
    addtoFavorite: (idMeal: string) => void;
    removeFomFavorite: (idMeal: string) => void;
    favorites: any;
    home: () => void
}