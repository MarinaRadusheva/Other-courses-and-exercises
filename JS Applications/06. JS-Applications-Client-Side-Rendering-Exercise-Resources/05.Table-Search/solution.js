import { html, render } from './node_modules/lit-html/lit-html.js';

const data = await getData();
data.forEach(d=>d.match=false);

const tableBody = document.querySelector('tbody');

function solve() {
   loadData();
   const input = document.getElementById('searchField');
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let text = input.value.trim().toLocaleLowerCase();
      if(!text){
         return alert('field is required');
      }
      
      data.forEach(d=>d.match=false);
      
      const cells = [...document.querySelectorAll('td')].forEach(c=>{
         if(c.textContent.toLocaleLowerCase().includes(text)){
            let id = c.parentElement.id;
            const matchingElement = data.find(i=>i._id==id);
            matchingElement.match=true;
         }
      })
      input.value='';
      loadData();
   }
}

const trTemplate = (data) => html`${data.map(d=>html`<tr id=${d._id} class=${d.match ? "select" : ''}>
               <td>${d.firstName+' '+d.lastName}</td>
                <td>${d.email}</td>
                <td>${d.course}</td>
            </tr>`)}`;

async function loadData(){      
   render(trTemplate(data),tableBody);
}

async function getData(){
   const result = await fetch(`http://localhost:3030/jsonstore/advanced/table`);
   if(result.status!=200){
      throw new Error(await result.json());
   };
   const data = await result.json();
   return Object.values(data);
}

solve();