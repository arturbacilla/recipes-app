import React from 'react';
import { Switch, Route } from 'react-router';
import RecipesProvider from './context/RecipesProvider';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bebidas from './components/Bebidas';
import Comidas from './components/Comidas';

function App() {
  return (
    <RecipesProvider>
    <Switch>
      <Route path='/' component={} />
      <Route path='/comidas' component={ Bebidas } />
      <Route path='/bebidas' component={ Comidas } />
      <Route path='/comidas/:id-da-receita' render={} />
      <Route path='/bebidas/:id-da-receita' render={} />
      <Route path='/comidas/:id-da-receita/in-progress' render={} />
      <Route path='/bebidas/:id-da-receita/in-progress' render={} />
      <Route path='/explorar' component={} />
      <Route path='/explorar/comidas' component={} />
      <Route path='/explorar/bebidas' component={} />
      <Route path='/explorar/comidas/ingredientes' component={} />
      <Route path='/explorar/bebidas/ingredientes' component={} />
      <Route path='/explorar/comidas/area' component={} />
      <Route path='/perfil' component={} />
      <Route path='/receitas-feitas' component={} />
      <Route path='/receitas-favoritas' component={} />
    </Switch>
    </RecipesProvider>
  );
}

export default App;
