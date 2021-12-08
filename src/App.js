import React from 'react';
import { Switch, Route } from 'react-router';
import RecipesProvider from './context/RecipesProvider';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bebidas from './components/Bebidas';
import Comidas from './components/Comidas';
import NotFound from './components/NotFound';

function App() {
  return (
    <RecipesProvider>
    <Switch>
      <Route exact path='/' component={} />
      <Route exact path='/comidas' component={ Comidas } />
      <Route exact path='/bebidas' component={ Bebidas } />
      <Route exact path='/comidas/:id-da-receita' render={} />
      <Route exact path='/bebidas/:id-da-receita' render={} />
      <Route exact path='/comidas/:id-da-receita/in-progress' render={} />
      <Route exact path='/bebidas/:id-da-receita/in-progress' render={} />
      <Route exact path='/explorar' component={} />
      <Route exact path='/explorar/comidas' component={} />
      <Route exact path='/explorar/bebidas' component={} />
      <Route exact path='/explorar/comidas/ingredientes' component={} />
      <Route exact path='/explorar/bebidas/ingredientes' component={} />
      <Route exact path='/explorar/comidas/area' component={} />
      <Route exact path='/perfil' component={} />
      <Route exact path='/receitas-feitas' component={} />
      <Route exact path='/receitas-favoritas' component={} />
      <Route path='*' component={ NotFound } />
    </Switch>
    </RecipesProvider>
  );
}

export default App;
