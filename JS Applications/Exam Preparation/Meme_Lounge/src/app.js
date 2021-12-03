import { logout } from './api/api.js';
import { page, render } from './lib.js';
import { getUserData } from './utils.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/editPage.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { memesPage } from './views/memesPage.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(contextDecorator);
page('/', homePage);
page('/memesPage', memesPage);
page('/loginPage', loginPage);
page('/registerPage', registerPage);
page('/profilePage', profilePage);
page('/createPage', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page.start();
updateNav();

function contextDecorator(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav(){

    const userdata = getUserData();
    if(userdata){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent=`Welcome ${userdata.email}`
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

async function onLogout(){
    await logout();
    updateNav();
    page.redirect('/');
}