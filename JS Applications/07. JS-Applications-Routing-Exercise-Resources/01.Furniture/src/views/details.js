import { html, until} from '../lib.js';
import { deleteFurniture, getDetails } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (itemPromise) => html`
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Furniture Details</h1>
                </div>
            </div>
            ${until(itemPromise, html`<div>Loading ...</div>`)}
            `;

const itemTemplate = (item, isOwner, onDelete) => html`
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src=${item.img} />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <p>Make: <span>${item.make}</span></p>
                    <p>Model: <span>${item.model}</span></p>
                    <p>Year: <span>${item.year}</span></p>
                    <p>Description: <span>${item.description}</span></p>
                    <p>Price: <span>${item.price}</span></p>
                    <p>Material: <span>${item.material}</span></p>
                    ${isOwner ? html`<div>
                        <a href='/edit/${item._id}' class="btn btn-info">Edit</a>
                        <a @click=${onDelete} href='javascript:void(0)' class="btn btn-red">Delete</a>
                    </div>` : ''}
                    
                </div>
            </div>`

export async function detailsPage(ctx){
    
    const id = ctx.params.id
    return ctx.render(detailsTemplate(loadItem(id, onDelete)));

    async function onDelete(){
        if(window.confirm('Are you sure you want do delete this fabulous piece of furniture?')){
            await deleteFurniture(id);
            ctx.page.redirect('/')
        }
        
    }
}

async function loadItem(id, onDelete){
    const item = await getDetails(id);
    const userData = getUserData();
    const isOwner = userData ? (userData.id == item._ownerId) : false;
    console.log(isOwner);
    return itemTemplate(item, isOwner, onDelete);
}
