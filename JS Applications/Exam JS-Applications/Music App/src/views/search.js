import { searchAlbums } from '../api/data.js';
import { html, render } from '../lib.js';
import { getUserData } from '../utils.js';

const searchTemplate = (onSearch) => html`
     <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
                

                <!--If there are no matches-->
                
            </div>
        </section>`
const resultsTemplate = (results, loggedUser) => html`
    ${results.length!=0 ? results.map(r => resultItem(r, loggedUser)) : html`<p class="no-result">No result.</p>`}`;

const resultItem = (item, loggedUser) => html`
                <div class="card-box">
                    <img src=${item.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${item.name}</p>
                            <p class="artist">Artist: ${item.artist}</p>
                            <p class="genre">Genre: ${item.genre}</p>
                            <p class="price">Price: $${item.price}</p>
                            <p class="date">Release Date: ${item.releaseDate}</p>
                        </div>${loggedUser ? html` <div class="btn-group">
                            <a href="/details/${item._id}" id="details">Details</a>
                        </div>` : ''}                       
                    </div>
                </div>`

export function searchPage(ctx){
    let loggedUser=false;
    const userdata = getUserData();
    if(userdata){
        loggedUser=true;
    }
    
    return ctx.render(searchTemplate(onSearch));

    async function onSearch(){
        const newRoot = document.querySelector('.search-result');
        const searchText = document.getElementById('search-input').value;
        const allMatches = await searchAlbums(searchText)
        render(resultsTemplate(allMatches, loggedUser), newRoot);
        ctx.render(searchTemplate(onSearch));
    }
}