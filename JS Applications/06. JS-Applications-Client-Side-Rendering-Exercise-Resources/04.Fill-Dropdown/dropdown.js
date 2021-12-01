import { html, render } from './node_modules/lit-html/lit-html.js';

const dropdown = document.getElementById('menu');


const template = (towns) => html`${towns.map(t=>html`<option value=${t._id}>${t.text}</option>`)}`;


async function update(){
    let towns = await getAll();
    render(template(towns), dropdown);
}

update();

document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(ev){
    ev.preventDefault();
    const input = ev.target.querySelector('#itemText').value;
    if(!input){
        return alert('fill in town name');
    }
    await postNew(input);
    ev.target.querySelector('#itemText').value=''
    update();
}

async function getAll(){
    const result = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`);
    if(result.status!=200){
        const error = result.json();
        throw new Error(error);
    }
    const data = await result.json();
    return Object.values(data);
}
async function postNew(text){
    const result = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    });
    if(result.status!=200){
        const error = result.json();
        throw new Error(error);
    }
    const data = await result.json();
    return data;
}