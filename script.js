let globalMeals = [];
const fetchData = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(res => res.json())
        .then(data => {
            show_meals(data.meals);
        });
};

const show_meals = (meals) => {
    const mainBox = document.getElementById("allBoxes");
    mainBox.innerHTML = '';
    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];
        globalMeals.push(meal);
        const div = document.createElement("div");
        div.classList.add("box");

        div.innerHTML = `
        <img class="innerImg" src="${meal.strMealThumb}" alt="">
        <h3>Name: ${meal.strMeal}</h3>
        `;
        mainBox.appendChild(div);

        div.addEventListener("click", () => {
            const details = document.getElementById("details");

            details.innerHTML = '';

            const detailDiv = document.createElement("div");
            detailDiv.classList.add("allDetails");

            detailDiv.innerHTML = `
            <img class="innerImg" src="${meal.strMealThumb}" alt="">
            <h3>Name: ${meal.strMeal}</h3>
            <h4>Ingredients</h4>
            <ul>
                <li>${meal.strIngredient1 || ''}</li>
                <li>${meal.strIngredient2 || ''}</li>
                <li>${meal.strIngredient3 || ''}</li>
                <li>${meal.strIngredient4 || ''}</li>
                <li>${meal.strIngredient5 || ''}</li>
                <li>${meal.strIngredient6 || ''}</li>
            </ul> `;
            details.appendChild(detailDiv);
        });
    }
};
const searchMeals = () => {
    const searchInput = document.getElementById("search-box-input");
    const search = searchInput.value;
    const searchBox = document.getElementById("allBoxes");
    const details = document.getElementById("details")
    details.innerHTML = '';
    searchBox.innerHTML = '';

    const searchMeals = globalMeals.filter(meal => meal.strMeal.toLowerCase().includes(search.toLowerCase()));
    if(searchMeals.length > 0){
        show_meals(searchMeals);
    }
    else{
        searchBox.innerHTML = `<h2>No meals found</h2>`
    }

    searchInput.value = '';
}
fetchData();