function attachEvents() {
    let loadButton = document.getElementById('btnLoadPosts');
    let dropDownPosts = document.getElementById('posts');
    let commentsButton = document.getElementById('btnViewPost');

    loadButton.addEventListener('click', function(e){
        fetch('http://localhost:3030/jsonstore/blog/posts')
        .then(res => {
            if(res.status !=200){
                throw new Error('Error');
            }
            return res.json();
        })
        .then(data => {
            Object.entries(data).forEach(([key, value]) =>{
                let title = value.title;
                let newOption = document.createElement('option');
                newOption.setAttribute("value", key);
                newOption.textContent = title;
                dropDownPosts.appendChild(newOption);
            })
        })
        .catch(error =>{
            console.log(error.message);
        })
    });

    commentsButton.addEventListener('click', function(e){
        let postId = dropDownPosts.options[dropDownPosts.selectedIndex].value;
        fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`)
        .then(res => {
            if(res.status !=200){
                throw new Error('Error');
            }
            return res.json();
        })
        .then(data => {
            document.getElementById('post-title').textContent = data.title;
            document.getElementById('post-body').textContent = data.body;

            let commentsList = document.getElementById('post-comments');
            loadComments(commentsList, data.id);
        })
        .catch(error =>{
            console.log(error.message);
        })

        function loadComments(list, id){
            list.replaceChildren();
            fetch(`http://localhost:3030/jsonstore/blog/comments`)
            .then(res => {
                if(res.status !=200){
                    throw new Error('Error');
                }
                return res.json();
            })
            .then(data => {
                Object.entries(data).forEach(([key, value]) =>{
                    if(value.postId==id){
                        let newLi = document.createElement('li');
                        newLi.setAttribute('id', key);
                        newLi.textContent=value.text;
                        list.appendChild(newLi);
                    }
                    
                })
            })
        }
    })
}

attachEvents();