function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let commitList = document.getElementById('commits');
    let url = `https://api.github.com/repos/${username}/${repo}/commits`;
    commitList.replaceChildren();
    fetch(url)
    .then(res => {
        if(res.status!=200){
            throw new Error(`Error: ${res.status} (Not Found)`);
        }
        return res.json();
    })
    .then(data => {
        //"<commit.author.name>: <commit.message>" 
        data.forEach(element => {
            let newLi = document.createElement('li');
            let name = element.commit.author.name;
            let commitMsg = element.commit.message;
            newLi.textContent=`${name}: ${commitMsg}`;
            commitList.appendChild(newLi);
        });
    })
    .catch(error => {
        let newLi = document.createElement('li');
        newLi.textContent=error.message;
        commitList.appendChild(newLi);
    })
}