import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../Header';
import SearchBar from '../Header/SearchBar';
import fetchRecipe from '../../services/api';
import Card from '../Card';
import FilterByCategory from '../Filter/FilterByCategory';
// import './style.css';

const apiType = 'meal';

function Meals() {
  const { renderBar,
    fetchedRecipes,
    setFetchedRecipes,
    ingredientsFetch,
    setIngredientsFetch,
  } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  const getFirstList = async () => {
    const LIST_SIZE = 12;
    const firstList = await fetchRecipe(apiType);
    // console.log('firstList of meals', firstList);
    return firstList.meals.slice(0, LIST_SIZE);
  };

  // componentDidMount
  useEffect(() => {
    if (!ingredientsFetch) {
      getFirstList().then((response) => {
        setFetchedRecipes(response);
        setOriginalData(response);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
    return () => {
      setIngredientsFetch(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header name="Comidas" apiType={ apiType } search />
      {renderBar ? <SearchBar apiType={ apiType } /> : null}
      <FilterByCategory apiType={ apiType } originalData={ originalData } />
      {isLoading ? <span>Loading...</span> : (
        <main className="recipes-container">
          {fetchedRecipes && fetchedRecipes.map((recipe, index) => (
            <Card
              key={ index }
              recipe={ recipe }
              apiType={ apiType }
              index={ index }
            />
          ))}
        </main>
      )}
      <Footer apiType={ apiType } />
    </>
  );
}

export default Meals;
