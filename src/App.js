import React from 'react';
import { Switch, Route } from 'react-router';
import RecipesProvider from './context/RecipesProvider';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
// import Comidas from './components/Comidas';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ReceitasFavoritas from './components/ReceitasFavoritas';
import ReceitasFeitas from './components/ReceitasFeitas';
import Explore from './components/Explore';
import ExploreRecipes from './components/Explore/Recipes';
import ExploreByIngredients from './components/Explore/ByIngredients';
import ExploreByOrigin from './components/Explore/ByOrigin';
import RecipeInProgress from './components/RecipeInProgress';
import Details from './components/Details/index';
import FilterProvider from './context/FilterProvider';

function App() {
  return (
    <RecipesProvider>
      <FilterProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Meals } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas/:id" component={ Details } />
          <Route exact path="/bebidas/:id" component={ Details } />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas">
            <ExploreRecipes recipeof="meal" />
          </Route>
          <Route exact path="/explorar/bebidas">
            <ExploreRecipes recipeof="cocktail" />
          </Route>
          <Route
            exact
            path="/explorar/comidas/ingredientes"
          >
            <ExploreByIngredients apiType="meal" />
          </Route>
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
          >
            <ExploreByIngredients apiType="cocktail" />
          </Route>
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreByOrigin }
          />
          <Route
            exact
            path="/explorar/bebidas/area"
            component={ NotFound }
          />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          {/* <Route exact path="/explorar/comidas/random" component={ Details } />
          <Route exact path="/explorar/bebidas/random" component={ Details } /> */}
          <Route path="*" component={ NotFound } />
        </Switch>
      </FilterProvider>
    </RecipesProvider>
  );
}

export default App;
