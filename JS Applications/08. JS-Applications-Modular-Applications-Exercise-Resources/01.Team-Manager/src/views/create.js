import { addMemberRequest, approveMembership, createTeam } from '../api/data.js';
import { html} from '../lib.js';

const createTemplate = (onSubmit, errMsg) => html`
        <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                        ${errMsg ? html`<div class="error">${errMsg}</div>` : ''}
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>`;

export function createPage(ctx){
    ctx.render(createTemplate(onSubmit));

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
    
            const newteam = await createTeam({name, logoUrl, description});
            const request = await addMemberRequest(newteam._id);
            await approveMembership(request);
            ctx.page.redirect(`/details/${newteam._id}`);
        } catch (error) {
            ctx.render(createTemplate(onSubmit, error.message));
        }

        
    }
}