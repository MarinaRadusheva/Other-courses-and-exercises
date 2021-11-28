window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', onLogin);
});

async function onLogin(ev){
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const result = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if(result.ok!=true){
            throw new Error(await result.json().message);
        }

        const data = await result.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = './index.html';

    } catch (error) {
        alert(error)
    }
}
