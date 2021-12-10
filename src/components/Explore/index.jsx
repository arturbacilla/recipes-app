import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

function Explore() {
  return (
    <>
      <Header name="Explorar" />
      <section>
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-food">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
      </section>
    </>
  );
}

export default Explore;
