import {html, render} from './node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';


const div = document.getElementById('towns');
const btn = document.querySelector('button');
const input = document.querySelector('input');
const result = document.getElementById('result');
btn.addEventListener('click', search);
const townsData = towns.map(t=>({name: t, match: false}));
console.log(townsData);

const template = (townsData) => html`<ul>
   ${townsData.map(t=>html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}
</ul>`

update();

function update(){
   render(template(townsData), div);
}
function search() {
   if(input.value==''){
      return alert('field is required');
   }
   const match = input.value.trim().toLocaleLowerCase();
   townsData.map((t)=>{
      if(t.name.toLocaleLowerCase().includes(match)){
         t.match=true;
      }
      else{
         t.match=false;
      }
      return t;
   });
   const count = townsData.filter(t=>t.match==true).length;
   result.textContent=`${count} matches found`;
   input.value='';
   update();
}
