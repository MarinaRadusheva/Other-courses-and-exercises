import { deleteMeme, getMeme } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailTemplate = (meme, isOwner, onDelete) => html`
        <section id="meme-details">
            <h1>Meme Title: ${meme.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>
                    ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>` 
                    : ''}                    
                </div>
            </div>
        </section>`

export async function detailsPage(ctx){
    const memeId = ctx.params.id;
    const meme = await getMeme(memeId);
    const owner = isOwner(meme);
    ctx.render(detailTemplate(meme, owner, onDelete));

    async function onDelete(){
        if(window.confirm("Are you sure you don't want this meme anymore?")){
            await deleteMeme(memeId);
            ctx.page.redirect('/memesPage');
        }
        
    }

    function isOwner(meme){
        const userData = getUserData();
        if(userData && userData.id == meme._ownerId){
            return true;
        } else {
            return false;
        }
    }
}

