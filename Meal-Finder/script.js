const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Search meal and fetch api
function searchMeal(e) {
  e.preventDefault();
  // clear single meal
  single_mealEl.innerHTML = "";

  // get search meal
  const term = search.value;

  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p> There are no search results. Try again! </p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class='meal'>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealId="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            .join("");
          // clear search
          search.value = "";
        }
      });
  } else {
    alert("Please enter a search term");
  }
}

// Fetch Random Meal
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class='single-meal'>
      <h1>${meal.strMeal}</h1>
      <img src='${meal.strMealThumb}' />
      <div class='single-meal-info'>
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class='main'>
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}
// fetch meal by id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal);
      addMealToDOM(meal);
    });
}

// Event Listener
submit.addEventListener("click", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }
});
