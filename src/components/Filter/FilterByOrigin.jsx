import PropTypes from 'prop-types';
import React from 'react';

function FilterByOrigin({ apiType }) {
  console.log(apiType);
  return (
    <div />
  );
}

FilterByOrigin.propTypes = {
  apiType: PropTypes.string.isRequired,
};

export default FilterByOrigin;
