import { logout } from './api/data.js';
import {page, render} from './lib.js';
import { getUserData } from './utils.js';
import { addPage } from './views/add.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myBooksPage } from './views/myBooks.js';
import { registerPage } from './views/register.js';

const root = document.getElementById('site-content');

document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(ctxDecorator);
page('/', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/add', addPage);
page('/myBooks', myBooksPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);


page.start();
updateNav();

function ctxDecorator(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

async function onLogout(){
    await logout();
    updateNav();
    page.redirect('/');    
}

function updateNav(){
    const userdata = getUserData();
    console.log(userdata);
    if(userdata){
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userdata.email}`;
    }else{
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

