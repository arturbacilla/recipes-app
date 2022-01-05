import React from 'react';

function RecipeInProgress(props) {
  const { match } = props;
  return (
    <div>
      {
        console.log(match)
      }
    </div>
  );
}

export default RecipeInProgress;
