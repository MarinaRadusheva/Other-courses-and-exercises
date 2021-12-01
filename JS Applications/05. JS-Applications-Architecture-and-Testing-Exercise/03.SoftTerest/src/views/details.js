import { deleteIdea, getIdea } from '../api/data.js';
import { e } from '../dom.js';

const section = document.getElementById('detailsPage');
section.remove();
let ctx = null;


export async function showDetailsPage(ctxTarget, id) {
    console.log(id);
    ctx=ctxTarget;
    ctx.showSection(section);
    loadIdea(id);
}

async function loadIdea(id) {
    const idea = await getIdea(id);
    section.replaceChildren(createIdeaCard(idea));
}

function createIdeaCard(idea){
    const fragment = document.createDocumentFragment();
    fragment.appendChild(e('img', {className: "det-img", src: idea.img}));
    fragment.appendChild(e('div', {className: 'desc'},
                        e('h2', {className: "display-5"}, idea.title),
                        e('p', {className: "infoType"}, "Description:"),
                        e('p', {className:"idea-description"}, idea.description)));
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData && userData.id==idea._ownerId){
        fragment.appendChild(e('div', {className: "text-center"},
        e('a', {className: "btn detb", href: "", onClick: onDelete}, "Delete")));
    }

    return fragment;

    async function onDelete(ev){
        ev.preventDefault();
        const confirmed = confirm("Are you sure you want to delete it?");
        if(confirmed){
            await deleteIdea(idea._id);
            ctx.goTo('catalogue');
        }
    }
}