import * as api from './api/data.js';
import {page, render} from './lib.js';
import { getUserData } from './utils.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';
window.api=api;

const root = document.getElementById('main-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(ctxDecorator);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/search', searchPage);

page.start();
updateNav();

function ctxDecorator(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav=updateNav;
    next();
}

async function onLogout(){
    await api.logout();
    updateNav();
    page.redirect('/');
}

function updateNav(){
    const userdata= getUserData();
    if(userdata){
        [...document.getElementsByClassName('user')].forEach(e=>e.style.display='inline-block');
        [...document.getElementsByClassName('guest')].forEach(e=>e.style.display='none');
    } else {
        [...document.getElementsByClassName('user')].forEach(e=>e.style.display='none');
        [...document.getElementsByClassName('guest')].forEach(e=>e.style.display='inline-block');
    }
}