function lockedProfile() {
    let mainEl = document.getElementById('main');

    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
    .then(res => {
        if(res.status != 200){
            throw new Error("Error");
        }
        return res.json();
    })
    .then(data => {
        mainEl.replaceChildren();
        let profilesArray = Object.entries(data);
        let i = 0;
        profilesArray.forEach(([key, value]) => {
            i++;
            let buttonName = `user${i}Locked`;
            let inputEmail = `user${i}Email`;
            let inputUsername = `user${i}Username`;
            let inputAge = `user${i}Age`;
            let profileName = value.username;
            let profileEmail = value.email;
            let profileAge = value.age;

            let newProfileDiv = document.createElement('div');
            newProfileDiv.classList.add('profile');
            newProfileDiv.innerHTML = `
			<img src="./iconProfile2.png" class="userIcon" />
			<label>Lock</label>
			<input type="radio" name=${buttonName} value="lock" checked>
			<label>Unlock</label>
			<input type="radio" name=${buttonName} value="unlock"><br>
			<hr>
			<label>Username</label>
			<input type="text" name=${inputUsername} value=${profileName} disabled readonly />
			<div class="hiddenInfo">
				<hr>
				<label>Email:</label>
				<input type="email" name=${inputEmail} value=${profileEmail} disabled readonly />
				<label>Age:</label>
				<input type="email" name=${inputAge} value=${profileAge} disabled readonly />
			</div>
				
			<button>Show more</button>`;
            mainEl.appendChild(newProfileDiv);
        })
    });

    mainEl.addEventListener('click', function(e){
        console.log(e.target.textContent);
        if(e.target.textContent==='Show more' || e.target.textContent==='Hide it'){
            let lockedButton = e.target.parentElement.querySelector('input[value="lock"]');
            let hiddenDiv = e.target.parentElement.querySelector('.hiddenInfo');
            if(!lockedButton.checked && hiddenDiv.style.display===''){
                hiddenDiv.style.display = 'block'
                hiddenDiv.querySelectorAll('input, label').forEach(x=>x.style.display='block');
                e.target.textContent='Hide it';
            }
            else if(!lockedButton.checked && hiddenDiv.style.display==='block'){
                hiddenDiv.style.display = '';
                hiddenDiv.querySelectorAll('input, label').forEach(x=>x.style.display='');
                e.target.textContent = 'Show more';
            }
        }
    })
}