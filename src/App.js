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

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/comidas/:id" component={ Profile } />
        {/* <Route exact path='/bebidas/:id-da-receita' render={} /> */}
        {/* <Route exact path='/comidas/:id-da-receita/in-progress' render={} /> */}
        {/* <Route exact path='/bebidas/:id-da-receita/in-progress' render={} /> */}
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
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreByOrigin }
        />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        {/* <Route path="*" component={ NotFound } /> */}
      </Switch>
    </RecipesProvider>
  );
}

export default App;
