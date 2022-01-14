import { register } from '../api/data.js';
import { html} from '../lib.js';

const registerTemplate = (onSubmit, errMsg) => html`
    <section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
                        ${errMsg ? html`<div class="error">${errMsg}</div>` : ''}
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>`;

export function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repass');
        try {
            if(email=='' || username=='' || password=='' || repass==''){
                throw new Error('All fields are required');
            }
    
            if(!email.match(/[\w]+@[a-z]+.[a-z]+/)){
                throw new Error('Enter a valid email');
            }
            
            if(username.length<3){
                throw new Error('Username must be at least 3 characters');
            }
            if(password.length<3){
                throw new Error('Password must be at least 3 characters');
            }
            if(password!=repass){
                throw new Error('Passowrds do not match');
            }
    
            await register(email, username, password);
    
            ctx.updateNav();
            ctx.page.redirect('/catalog');
        } catch (error) {
            ctx.render(registerTemplate(onSubmit, error.message));
        }

        
    }
}