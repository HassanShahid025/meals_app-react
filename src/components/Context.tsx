import { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { IAppContext } from "../type";


const AppContext = createContext<IAppContext | null>(null);

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


export const AppProvider = ({ children }: any) => {

    const [meals, setMeals] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const fetchMeals = async (url:string) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const data = await response.json()
            if(data.meals > 1){
                setMeals(data.meals);
            }else{
                setMeals([])
            }
            
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    },[])


  return(
    <AppContext.Provider
   value={{
    meals,
    loading
   }}>
    {children}
    </AppContext.Provider>
  )
};


export const useGlobalContext = () => {
  return useContext(AppContext);
};
