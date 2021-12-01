import {html, render} from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
document.querySelector('form').addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const towns = document.getElementById('towns').value.split(',').map(t=>t.trim());
    render(template(towns), root);
})


const template = (towns) =>
    html`<ul>
    ${towns.map(t=>html`<li>${t}</li>`)}
    </ul>`;