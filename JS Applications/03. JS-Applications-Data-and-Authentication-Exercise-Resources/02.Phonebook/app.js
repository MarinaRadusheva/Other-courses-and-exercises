const url = 'http://localhost:3030/jsonstore/phonebook'
const list = document.getElementById('phonebook');

function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadPhonebook);

    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createContact);
}

function createContact(){
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const person = personInput.value;
    const phone = phoneInput.value;
    if(person && phone){
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({person, phone})
        })
        .then(res => {
            if(res.status!=200){
                throw new Error(res.json().status)
            }
            return res.json();
        })
        .then(data => {
            const newId = data._id;
            personInput.value='';
            phoneInput.value='';
            const newLi = makeLi(newId, {person, phone});
            list.appendChild(newLi);
        })
        .catch(error => {
            alert(error.message);
        })
    }
    else{
        alert('Type person and phone!');
    }
}

function loadPhonebook(){
    fetch(url)
    .then(res => {
        if(res.status!=200){
            throw new Error(res.json().status)
        }
        return res.json();
    })
    .then(data => {
        const contacts = Object.entries(data).map(([key, value]) => makeLi(key, value));
        console.log(contacts);
        contacts.forEach(e => list.appendChild(e));
    })
    .catch(error => {
        alert(error.message);
    })
}

function makeLi(key, contactObj){
    const li = document.createElement('li');
    li.id=key
    li.textContent = `${contactObj.person}: ${contactObj.phone}`;
    const delButton = document.createElement('button');
    delButton.textContent='Delete';
    delButton.addEventListener('click', deleteContact);
    li.appendChild(delButton);
    return li;
}

function deleteContact(e){
    const id = e.target.parentElement.id;
    const urlToDelete = url + '/' + id;
    fetch(urlToDelete, {
        method: 'delete'
    })
    .then(res => {
        if(res.status!=200){
            throw new Error(res.json().message);
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        e.target.parentElement.replaceWith('');
    })
    .catch(error => {
        alert(error);
    })
}

attachEvents();