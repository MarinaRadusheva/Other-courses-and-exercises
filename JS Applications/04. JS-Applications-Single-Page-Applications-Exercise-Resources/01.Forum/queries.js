export {getTopic, addComment, getComments};

async function getTopic(id){
    return await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/'+id)
    .then(res => {
        if(res.ok!=true){
            throw new Error(response.json().message);
        }
        return res.json();
    })
    .then(data=>{
        return data;
    })
    .catch(err => {
        alert(error);
    })
}

async function addComment(commentObj){
    return await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(commentObj)
    })
    .then(res=>{
        if(res.ok!=true){
            throw new Error(response.json().message);
        }
        return res.json();
    })
    .then(data => {
        return data
    })
    .catch(err => {
        alert(err);
    })
}

async function getComments(id){
    return await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`)
    .then(res=>{
        if(res.ok!=true){
            throw new Error(response.json().message);
        }
        return res.json();
    })
    .then(data => {
        let values = Object.values(data);
        console.log(id);
        values = values.filter(v=>v.postId==id);
        return values;
    })
    .catch(err => {
        alert(err);
    })
}