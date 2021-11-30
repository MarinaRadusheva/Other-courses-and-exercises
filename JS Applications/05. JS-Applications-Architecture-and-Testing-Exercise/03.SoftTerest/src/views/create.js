import { createIdea } from '../api/data.js';

const section = document.getElementById('createPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export async function showCreatePage(ctxTarget) {
    ctx=ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(ev){
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();
    if(title.length<6){
        return alert("Title must be longer than 6 characters");
    }
    if(description.length<10){
        return alert("Description must be longer than 10 characters");
    }
    if(img.length<5){
        return alert("Image must be longer than 5 characters");
    }

    await createIdea({title, description, img});
    form.reset();
    ctx.goTo('catalogue');
}