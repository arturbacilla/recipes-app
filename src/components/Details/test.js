/* eslint-disable quotes */
const ingredient = [
  "Lentils",
  "Onion",
  "Carrots",
  "Tomato Puree",
  "Cumin",
  "Paprika",
  "Mint",
  "Thyme",
  "Black Pepper",
  "Red Pepper Flakes",
  "Vegetable Stock",
  "Water",
  "Sea Salt",
  "",
  "",
];

function filterIngredients(array) {
  const filtered = [];
  array.forEach((curr) => {
    if (curr !== null && curr.length > 0) {
      filtered.push(curr);
    }
  });

  return filtered;
}

console.log(filterIngredients(ingredient));
console.log(ingredient[13] !== null);
