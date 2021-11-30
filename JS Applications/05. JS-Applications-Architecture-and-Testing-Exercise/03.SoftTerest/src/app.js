import { showCataloguePage } from "./views/catalogue.js";
import { showCreatePage } from "./views/create.js";
import { showDetailsPage } from "./views/details.js";
import { showHomePage } from "./views/home.js"; 
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { showSection } from "./dom.js";
import { logout } from "./api/data.js";

const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'catalogueLink': 'catalogue',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create',
};

const views = {
    'home': showHomePage,
    'catalogue': showCataloguePage,
    'login': showLoginPage,
    'register':showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage
}

const ctx = {
    goTo,
    showSection,
    updateNav,
}

const nav = document.querySelector('nav');

nav.addEventListener('click', onNavigate);
document.getElementById('logoutLink').addEventListener('click', async (ev) =>{
    ev.preventDefault();
    await logout();
    updateNav();
    goTo('home');    
})
//Start application
goTo('home');
updateNav();

function onNavigate(ev){
    const name = links[ev.target.id];
    if(name){
        ev.preventDefault();
        goTo(name);
    }
    
}

function goTo(name, ...params){
    const view = views[name];
    if(typeof view == 'function'){
        view(ctx, ...params);
    }
}

function updateNav(){
    const userData = sessionStorage.getItem('userData');
    console.log(userData);
    if(userData){
        [...nav.querySelectorAll('.user')].forEach(l=>l.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(l=>l.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.guest')].forEach(l=>l.style.display = 'block');
        [...nav.querySelectorAll('.user')].forEach(l=>l.style.display = 'none');
    }
}