import { html} from '../lib.js';
import { getTeamById, editTeam} from '../api/data.js';

const editTemplate = (team, onSubmit, errMsg) => html`
        <section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
                         ${errMsg ? html`<div class="error">${errMsg}</div>` : ''}
                        <label>Team name: <input type="text" name="name" value=${team.name}></label>
                        <label>Logo URL: <input type="text" name="logoUrl" value=${team.logoUrl}></label>
                        <label>Description: <textarea name="description" >${team.description}</textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>`;

export async function editPage(ctx){
    const team = await getTeamById(ctx.params.id);
    ctx.render(editTemplate(team, onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');
        try {
            if(name=='' || logoUrl=='' || description==''){
                throw new Error('All fields are required');
            }
    
            if(name.length<4){
                throw new Error('Name must be at least 4 characters');
            }
            if(description.length<10){
                throw new Error('Description must be at least 10 characters');
            }
    
            await editTeam(team._id, {name, logoUrl, description});
            ctx.page.redirect(`/details/${team._id}`);
        } catch (error) {
            ctx.render(editTemplate(team, onSubmit, error.message));
        }

        
    }
}