export { createTopicPreview, showFullTopic };
import { getTopic, addComment, getComments } from '/queries.js';
function createTopicPreview(topicObj) {
    const div = document.createElement('div');
    div.classList.add('topic-container');
    div.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="javascript:void(0)" class="normal">
                    <h2 id="${topicObj.id}"">${topicObj.topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${topicObj.date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${topicObj.username}</span></p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    `;
    return div;
}

async function showFullTopic(e) {

    document.querySelector('main').style.display ='none';
    const topicId = e.target.id;

    const data = await getTopic(topicId);
    console.log('got the data\n' + data);
    const comments = await getComments(data._id);
    let divs = [];
    if(comments){
        divs = (comments.map(c=>createCommentDiv(c))).reverse();
    }    
    console.log(divs);
    let topicDiv = document.createElement('div');
    topicDiv.classList.add('comment');
    topicDiv.innerHTML = `
            <div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${data.username}</span> posted on <time>${data.date}</time></p>

                <p class="post-content">${data.postText}</p>
            </div>
            <div id="user-comment">
            ${divs.map(d=>d.outerHTML).join('\n')}
            </div>`;
    
    
    const commentForm = document.createElement('div');
    commentForm.classList.add('answer-comment');
    commentForm.innerHTML=`
            <p><span>currentUser</span> comment:</p>
                <div class="answer" >
                    <form id=${data._id}>
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <button>Post</button>
                    </form>
                </div>`;
    commentForm.querySelector('form').addEventListener('submit', submitComment);
    topicDiv.appendChild(commentForm);
    document.querySelector('.container').appendChild(topicDiv);
}

async function submitComment(e){
    e.preventDefault();
    const id = e.target.id;
    const formData = new FormData(e.target);
    const postText = formData.get('postText');
    const username = formData.get('username');
    const postId = id;
    const date = new Date(Date.now()).toISOString();
    const newComment = await addComment({postText, username, date, postId});
    const newCommentDiv = createCommentDiv(newComment);
    document.querySelector('#user-comment').prepend(newCommentDiv);
    e.target.reset();
}

function createCommentDiv(comment){
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('topic-name-wrapper');
    commentDiv.innerHTML=`
        <div class="topic-name">
            <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
            <div class="post-content">
                <p>${comment.postText}</p>
            </div>
        </div>`;
    
        return commentDiv;
}

