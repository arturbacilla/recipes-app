import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function FinishButton() {
  const [isRedirected, setIsRedirected] = useState(false);

  const verifyAllChecks = () => {
    const inputs = Array.from(document.getElementsByClassName('ingredient'));
    console.log(inputs);
  };
  verifyAllChecks();
  return (
    <div>
      {
        isRedirected ? (<Redirect to="/receitas-feitas" />) : (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => { setIsRedirected(true); } }
          >
            Finish Recipe
          </button>)
      }
    </div>
  );
}
