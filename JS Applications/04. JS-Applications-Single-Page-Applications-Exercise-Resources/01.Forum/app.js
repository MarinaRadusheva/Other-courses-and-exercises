import{createTopicPreview, showFullTopic} from '/topics.js';

const form = document.querySelector('#topicForm');
const topicsList = document.querySelector('.topic-title');
const homeBtn = document.querySelector('nav a');

window.onload = function () {
    onload();
}

homeBtn.addEventListener('click', () =>{
    topicsList.innerHTML='';
    onload();
});

function onload(){
    fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`)
    .then(res => {
        if(res.ok!= true){
            throw new Error(res.json());
        }
        return res.json();
    })
    .then(data => {
        Object.values(data).forEach(e=> {
            let topicName=e.topicName;
            let username = e.username;
            let postText = e.postText;
            let id=e._id;
            let date = e.date;

            let newEl = createTopicPreview({topicName, username, postText, id, date});
            newEl.querySelector('h2').addEventListener('click', showFullTopic)
            topicsList.appendChild(newEl);
        });
        document.querySelectorAll('.comment').forEach(x=>x.remove());
        document.querySelector('main').style.display = 'block';
    })
    .catch(err =>{
        alert(err.message);
    })
}

form.addEventListener('click', async (e) => {
    e.preventDefault();
    if(e.target.textContent == 'Cancel'){
        form.reset();
    } else if(e.target.textContent == 'Post'){
    const formData = new FormData(form);
    const topicObj = await createTopicObj(formData);
    if(topicObj!=undefined){
    form.reset();
    console.log(topicObj)
    const div = createTopicPreview(topicObj);
    topicsList.appendChild(div);
    }
}
})

async function createTopicObj(data) {
    const topicName = data.get('topicName').trim();
    const username = data.get('username').trim();
    const postText = data.get('postText').trim();
    if (topicName && username && postText) {
        console.log('good')
        const date = new Date(Date.now()).toISOString();
        const comments = [];
        console.log(date);
        const newTopic = { topicName, username, postText, date, comments }
        return await addTopic(newTopic);
    } else {
        alert('allfields are required');
        return;
    }
}

async function addTopic(topic) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(topic)
        });
        if (response.status != 200) {
            throw new Error(response.json().message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(error);
    }

}