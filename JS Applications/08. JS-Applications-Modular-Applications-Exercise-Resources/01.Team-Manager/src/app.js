import * as api from './api/data.js';
import {page, html, render} from './lib.js';
import { getUserData, setUserData, clearUserData} from './util.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myTeamsPage } from './views/myTeams.js';
import { registerPage } from './views/register.js';

window.api=api;

const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);
updateNav();

page(ctxDecorator);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/myTeams', myTeamsPage);

page.start();

function ctxDecorator(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.userData = getUserData();
    ctx.updateNav = updateNav;
    next();
}

function updateNav(){
    const userData = getUserData();
    if(userData){
        [...document.querySelectorAll('a.user')].forEach(e =>e.style.display='block');
        [...document.querySelectorAll('a.guest')].forEach(e =>e.style.display='none');
    } else {
        [...document.querySelectorAll('a.user')].forEach(e =>e.style.display='none');
        [...document.querySelectorAll('a.guest')].forEach(e =>e.style.display='block');
    }
}

async function onLogout(){
    await api.logout();
    updateNav();
    page.redirect('/');
}