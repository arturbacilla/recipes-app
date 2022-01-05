import React, { useContext, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from '../Header/SearchBar';
import fetchRecipe from '../../services/api';
import Card from '../Card';

const apiType = 'cocktail';

function Drinks() {
  const { renderBar, fetchedRecipes, setFetchedRecipes } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);

  const getFirstList = async () => {
    const LIST_SIZE = 12;
    const firstList = await fetchRecipe(apiType);
    return firstList.drinks.slice(0, LIST_SIZE);
  };

  useEffect(() => {
    getFirstList().then((response) => {
      setFetchedRecipes(response);
    }).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header name="BEBIDAS" search />
      {renderBar ? <SearchBar apiType={ apiType } /> : null}
      {isLoading ? <span>Loading...</span> : (
        <main>
          {fetchedRecipes && fetchedRecipes.map((recipe, index) => (
            <Card
              key={ index }
              index={ index }
              recipe={ recipe }
              apiType={ apiType }
            />
          ))}
        </main>)}
      <Footer />
    </>
  );
}

export default Drinks;
