window.addEventListener('DOMContentLoaded', async ()=>{
    const mainEl = document.querySelector('main');
    let recipes = await GetRecipes();
    let allPreviewElements = recipes.map(createPreview);
    mainEl.innerHTML='';
    allPreviewElements.forEach(element => {
        mainEl.appendChild(element);
    });

});

async function createRecipeCard(id, preview){
    let recipe = await GetSelectedRecipe(id);
    let article = document.createElement('article');
    article.innerHTML = `
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src=${recipe.img}>
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
                <ul>
                 ${recipe.ingredients.map(i => `<li>${i}</li>`).join('\n')}
                </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
            ${recipe.steps.map(s=>`<p>${s}</p>`).join('\n')}
    </div>`;
    preview.replaceWith(article);
}

function createPreview(recipe){
    let article = document.createElement('article');
    article.classList.add('preview');
    article.innerHTML=`
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small">
        <img src=${recipe.img}>
    </div>`

    article.addEventListener('click', () => createRecipeCard(recipe._id, article));

    return article;
}

async function GetRecipes(){
   return fetch(`http://localhost:3030/jsonstore/cookbook/recipes`)
    .then(res => {
        if(res.status!=200){
            throw new Error('Error');
        }
        return res.json();
    })
    .then(data =>{
        return Object.values(data)
    })
    .catch(error => {
        console.log(error);
    });
}

async function GetSelectedRecipe(id){
    return fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
    .then(res => {
        if(res.status!=200){
            throw new Error('Error');
        }
        return res.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.log(error);
    });
}