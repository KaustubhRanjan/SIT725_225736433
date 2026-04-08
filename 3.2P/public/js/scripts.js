$(document).ready(function () {
  $('.modal').modal();

  $('#loadRecipes, #formSubmit').click(function () {
    fetch('/recipes')
      .then(response => response.json())
      .then(data => {
        displayRecipes(data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  });
});

function displayRecipes(recipes) {
  let html = '';

  recipes.forEach(recipe => {
    html += `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="${recipe.image}" alt="${recipe.name}">
            <span class="card-title">${recipe.name}</span>
          </div>
          <div class="card-content">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p>${recipe.description}</p>
          </div>
        </div>
      </div>
    `;
  });

  $('#card-section').html(html);
}

$('#formSubmit').click(function () {
  fetch('/recipes')
    .then(res => res.json())
    .then(data => {
      displayRecipes(data);

      const modal = M.Modal.getInstance($('#modal1'));
      modal.close();
    });
});