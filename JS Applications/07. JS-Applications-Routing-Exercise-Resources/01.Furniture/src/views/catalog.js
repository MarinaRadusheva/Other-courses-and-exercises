import { getAll, myFurniture } from '../api/data.js';
import { html, until} from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (isUserPage) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>${isUserPage ? 'My Furniture' : 'Welcome to Furniture System'}</h1>
                <p>${isUserPage ? 'This is a list of your publications.' : 'Select furniture from the catalog to view details.'}</p>
            </div>
        </div>
        ${until(makeCards(isUserPage), html`<p>Loading...</p>`)}`;

export function catalogPage(ctx){
    const isUserPage = ctx.path == '/my-furniture';
    return ctx.render(catalogTemplate(isUserPage));
}

async function makeCards(isUserPage){
    let items = [];
    if(isUserPage){
        const id = getUserData().id;
        items = await myFurniture(id);
    }else{
        items = await getAll();
    }
    return html`<div class="row space-top">${items.map(i=>html`
                    <div class="col-md-4">
                        <div class="card text-white bg-primary">
                            <div class="card-body">
                                <img src=${i.img} />
                                <p>${i.description}</p>
                                <footer>
                                    <p>Price: <span>${i.price} $</span></p>
                                </footer>
                                <div>
                                    <a href="/details/${i._id}" class="btn btn-info">Details</a>
                                </div>
                             </div>
                         </div>
                    </div>`)}
                </div>`;
}