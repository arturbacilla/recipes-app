export default async function fetchRecipe(type = 'meal', searchby = '', keyword = '') {
  const API_LINK = `https://www.the${type}db.com/api/json/v1/1/`;
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
  default:
    API_ENDPOINT = `${API_LINK}search.php?s=${keyword}`;
    break;
  }
  try {
    const request = await fetch(API_ENDPOINT);
    const fetchedRecipe = await request.json();
    return fetchedRecipe;
  } catch (error) {
    console.log(error);
  }
}

console.log(fetchRecipe('meal', 'letter', 'a'));
