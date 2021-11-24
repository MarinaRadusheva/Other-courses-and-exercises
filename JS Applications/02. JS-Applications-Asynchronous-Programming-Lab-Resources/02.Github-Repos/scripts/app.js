function loadRepos() {

	let user = document.getElementById('username').value;
	let list = document.getElementById('repos');
	let url = `https://api.github.com/users/${user}/repos`;
	list.replaceChildren();
	fetch(url)
	.then(res => {
		if(res.status != 200){
			console.log(res.status);
			throw new Error(`${res.status}`);
		}
		return res.json();
	})
	.then(data => {
		
		data.forEach(repo => {
		let newLi = document.createElement('li');
		newLi.innerHTML = `
		<a href="${repo.html_url}">
                ${repo.full_name}
        </a>`;
		list.appendChild(newLi);
		});
	})
	.catch(error => {
			let errorLi = document.createElement('li')
			errorLi.textContent=error.message;
			list.appendChild(errorLi);
	})
}