import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../Header';
import SearchBar from '../Header/SearchBar';
import fetchRecipe from '../../services/api';
import Card from '../Card';
import FilterByCategory from '../Filter/FilterByCategory';

const apiType = 'meal';

function Meals() {
  const { renderBar, fetchedRecipes, setFetchedRecipes } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);

  const getFirstList = async () => {
    const LIST_SIZE = 12;
    const firstList = await fetchRecipe(apiType);
    return firstList.meals.slice(0, LIST_SIZE);
  };

  useEffect(() => {
    getFirstList().then((response) => {
      setFetchedRecipes(response);
    }).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header name="Comidas" search />
      {renderBar ? <SearchBar apiType={ apiType } /> : null}
      <FilterByCategory apiType={ apiType } />
      {isLoading ? <span>Loading...</span> : (
        <main>
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
      <Footer />
    </>
  );
}

export default Meals;
