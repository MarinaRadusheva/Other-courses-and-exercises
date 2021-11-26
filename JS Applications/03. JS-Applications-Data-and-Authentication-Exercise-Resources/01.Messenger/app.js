const url = 'http://localhost:3030/jsonstore/messenger';
const authorInput = document.querySelector('input[name="author"]');
const contentInput = document.querySelector('input[name="content"]');
const chatWindow = document.getElementById('messages');

function attachEvents() {
    const refreshBtn = document.getElementById('refresh');
    const sendBtn = document.getElementById('submit');

    sendBtn.addEventListener('click', sendMessage);
    refreshBtn.addEventListener('click', loadMessages);

    loadMessages();
}

function sendMessage(e){
    const author = authorInput.value;
    const content = contentInput.value;
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({author, content})
    })
    .then(res => {
        if(res.ok !=true){
            throw new Error(res.json().status);
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        contentInput.value='';
        chatWindow.value+=`\n${author}: ${content}`;
    })
}

function loadMessages(){
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
       chatWindow.value = (Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n'));
    });
}

attachEvents();