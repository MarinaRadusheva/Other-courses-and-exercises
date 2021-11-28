window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', onRegister)
})

async function onRegister(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if(password!=rePass){
            throw new Error('Passwords do not match');
        }
        if(password && rePass && email){
            const newUser = { email, password};
            const result = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if(result.ok!=true){
                throw new Error(await result.json());
            }
            const data = await result.json();

            const userData = {
                email: data.email,
                id: data._id,
                token: data.accessToken
            }
            sessionStorage.setItem('userData', JSON.stringify(userData));
            window.location = './index.html';

        }else{
            throw new Error('Fields cannot be empty');
        }
    } catch (error) {
        alert(error.message)
    }
}