const element = document.createElement('div');
element.classList.add('overlay');
element.innerHTML= `<div class="modal">
    <p></p>
    <a id="okBtn" href="javascript:void(0)" class="action">OK</a>
    <a id="cancelBtn" href="javascript:void(0)" class="action">Cancel</a>
    </div>`;

element.querySelector('#okBtn').addEventListener('click', ()=>onChoice(true));
element.querySelector('#cancelBtn').addEventListener('click', ()=>onChoice(false));

const msg = element.querySelector('p');

let callback = null;

export function showModal(message, onSelect){
    callback=onSelect;
    msg.textContent=message;
    document.body.appendChild(element);
}

function onChoice(choice){
    clear();
    callback(choice);
}

function clear(){
    element.remove();
}