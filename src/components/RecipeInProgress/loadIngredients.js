const loadIngredientStatus = (translate, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (
    inProgressRecipes[translate][id] && inProgressRecipes[translate][id].length !== 0
  ) {
    inProgressRecipes[translate][id].forEach((e) => {
      // e[0] e e[1] sao as posicoes do nome do ingrediente e se ta marcado respectivamente.
      if (e[1]) {
        document.getElementById(e[0]).setAttribute('checked', 'checked');
      } else {
        document.getElementById(e[0]).removeAttribute('checked');
      }
    });
  }
};

export default loadIngredientStatus;
