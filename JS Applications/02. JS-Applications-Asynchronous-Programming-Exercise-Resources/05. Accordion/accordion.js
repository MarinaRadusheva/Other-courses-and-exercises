function solution() {
    let mainEl = document.getElementById('main');

    fetch(`http://localhost:3030/jsonstore/advanced/articles/list  `)
    .then(res => {
        if(res.status != 200){
            throw new Error('Status not 200');
        }
        return res.json();
    })
    .then(data => {
        data.forEach(element => {
            let articleId = element._id;
            let articleTitle = element.title;
            let newArticle = createArticle(articleId, articleTitle);
            mainEl.appendChild(newArticle);
        });

        
    })

    document.addEventListener('click', function(e){
        if(e.target.textContent === 'More'){
            let articleId = e.target.id;
            console.log(articleId)
            showText(articleId, e);
        }else if(e.target.textContent === 'Less'){
            hideText(e);
        }
    })

    function showText(id, e){
        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
        .then(res => {
            if(res.status != 200){
                throw new Error('Status not 200');
            }
            return res.json();
        })
        .then(data => {
            let articleParagraph = e.target.parentElement.parentElement.querySelector('p');
            articleParagraph.textContent=data.content;
            e.target.textContent = 'Less';
        })
    }

    function hideText(e){
        let text = `${e.target.parentElement.querySelector('span').textContent} .....`;
        let articleParagraph = e.target.parentElement.parentElement.querySelector('p');
        articleParagraph.textContent = text;
        e.target.textContent = 'More';
    }

    function createArticle(id, title){
        let articleDiv = document.createElement('div');
        articleDiv.classList.add('accordion');
        articleDiv.innerHTML = `
        <div class="head">
            <span>${title}</span>
            <button class="button" id=${id}>More</button>
        </div>
        <div class="extra">
            <p>${title} .....</p>
        </div>`
        articleDiv.querySelector('.extra').style.display = 'block';

        return articleDiv;
    }
}

solution();