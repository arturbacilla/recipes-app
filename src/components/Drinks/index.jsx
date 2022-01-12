import React, { useContext, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from '../Header/SearchBar';
import fetchRecipe from '../../services/api';
import Card from '../Card';
import FilterByCategory from '../Filter/FilterByCategory';

const apiType = 'cocktail';

function Drinks() {
  const { renderBar, fetchedRecipes, setFetchedRecipes,
    ingredientsFetch,
    setIngredientsFetch } = useContext(RecipesContext);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFirstList = async () => {
    const LIST_SIZE = 12;
    const firstList = await fetchRecipe(apiType);
    // console.log('firstList of drinks', firstList);
    return firstList.drinks.slice(0, LIST_SIZE);
  };

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
      <Header name="Bebidas" apiType={ apiType } search />
      {renderBar ? <SearchBar apiType={ apiType } /> : null}
      <FilterByCategory apiType={ apiType } originalData={ originalData } />
      {isLoading ? <span>Loading...</span> : (
        <main className="recipes-container">
          {fetchedRecipes && fetchedRecipes.map((recipe, index) => (
            <Card
              key={ index }
              index={ index }
              recipe={ recipe }
              apiType={ apiType }
            />
          ))}
        </main>)}
      <Footer apiType={ apiType } />
    </>
  );
}

export default Drinks;
