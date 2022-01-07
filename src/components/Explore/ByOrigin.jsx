import React, { useContext, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import FilterByOrigin from '../Filter/FilterByOrigin';
import RecipesContext from '../../context/RecipesContext';
import Card from '../Card';
import fetchRecipe from '../../services/api';

const apiType = 'meal';

function ExploreByOrigin() {
  const { fetchedRecipes, setFetchedRecipes } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  const getFirstList = async () => {
    const LIST_SIZE = 12;
    const firstList = await fetchRecipe(apiType);
    return firstList.meals.slice(0, LIST_SIZE);
  };

  useEffect(() => {
    getFirstList().then((response) => {
      setFetchedRecipes(response);
      setOriginalData(response);
    }).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header name="Explorar Origem" search />
      <FilterByOrigin apiType={ apiType } originalData={ originalData } />
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

export default ExploreByOrigin;
