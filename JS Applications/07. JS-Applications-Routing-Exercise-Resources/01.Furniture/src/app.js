import {page, render} from './lib.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';

const root = document.querySelector('.container');

document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(ctxDecorator);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);

page.start();
updateNav();

function ctxDecorator(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav(){
    const userData = getUserData();
    if(userData){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function onLogout(){
    await logout();
    updateNav();
    page.redirect('/');
}