import { login } from '../api/data.js';
import { html} from '../lib.js';

const loginTemplate = (onSubmit, errMsg) => html`
    <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
                        ${errMsg ? html`<div class="error">${errMsg}</div>` : ''}
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>`

export function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if(email=='' || password=='' || password.length<3){
                throw new Error('Fill out all fields');
            }
            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/catalog');
        } catch (error) {
            ctx.render(loginTemplate(onSubmit, error.message))
        }
        
    }
}