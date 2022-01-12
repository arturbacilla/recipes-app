export default async function fetchRecipe(type = 'meal', searchby = '', keyword = '') {
  // retorna um OBJETO com uma CHAVE meals/drinks com um ARRAY de objetos(comidas/bebidas)
  const API_LINK = type === 'cocktail'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/'
    : 'https://www.themealdb.com/api/json/v1/1/';
  let API_ENDPOINT = '';
  switch (searchby) {
  case 'ingredient':
    API_ENDPOINT = `${API_LINK}filter.php?i=${keyword}`;
    break;
  case 'letter':
    if (keyword.length === 1) {
      API_ENDPOINT = `${API_LINK}search.php?f=${keyword}`;
      break;
    } else {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  case 'id':
    API_ENDPOINT = `${API_LINK}lookup.php?i=${keyword}`;
    break;
  case 'category':
    API_ENDPOINT = `${API_LINK}filter.php?c=${keyword}`;
    break;
  case 'origin':
    API_ENDPOINT = `${API_LINK}filter.php?a=${keyword}`;
    break;
  case 'random':
    API_ENDPOINT = `${API_LINK}random.php`;
    break;
  default:
    API_ENDPOINT = `${API_LINK}search.php?s=${keyword}`;
    break;
  }
  try {
    const request = await fetch(API_ENDPOINT);
    const fetchedRecipe = await request.json();
    return fetchedRecipe;
  } catch (error) {
    console.log('the following error has occoured while fetching recipe:', error);
  }
}

export async function fetchLists(type = 'meal', listtype = 'category') {
  // retorna um OBJETO com uma CHAVE meals/drinks com um ARRAY de objetos({strCategory:categoria})
  const API_LINK = type === 'cocktail'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/'
    : 'https://www.themealdb.com/api/json/v1/1/';
  let API_ENDPOINT = '';
  switch (listtype) {
  case 'area':
    API_ENDPOINT = `${API_LINK}list.php?a=list`;
    break;
  case 'ingredients':
    API_ENDPOINT = `${API_LINK}list.php?i=list`;
    break;
  default:
    API_ENDPOINT = `${API_LINK}list.php?c=list`;
    break;
  }
  try {
    // console.log('usedApi:', API_ENDPOINT);
    const request = await fetch(API_ENDPOINT);
    const fetchedList = await request.json();
    return fetchedList;
  } catch (error) {
    console.log('the following error has occoured while fetching list:', error);
  }
}

export function getIngredientImg(type = 'meal', ingredient) {
  // retorna a url da imagem do ingrediente
  const IMG_LINK = type === 'cocktail'
    ? 'https://www.thecocktaildb.com/images/ingredients/'
    : 'https://www.themealdb.com/images/ingredients/';
  return `${IMG_LINK}${ingredient}-Small.png`;
}
