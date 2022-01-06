import React from 'react';
import PropTypes from 'prop-types';

export default function Instructions(props) {
  const { data, type } = props;
  const dataType = type === 'cocktail' ? 'drinks' : 'meals';

  console.log(data[dataType][0]);

  return (
    <section>
      <h2>Instructions</h2>
      <article data-testid="instructions">
        { data[dataType][0].strInstructions }
      </article>
    </section>
  );
}

Instructions.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  type: PropTypes.string.isRequired,
};
