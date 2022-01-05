import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

function ExploreByIngredients() {
  return (
    <>
      <Header name="Explorar Ingredientes" search={ false } />
      <section>
        <h3>Ingredientes</h3>
      </section>
      <Footer />
    </>
  );
}

export default ExploreByIngredients;
