window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData!=null){
        document.getElementById('guest').style.display = 'none';
        const email = userData.email;
        document.querySelector('#addForm .add').disabled = false;
        document.querySelector('.email span').textContent=email;
        document.getElementById('logout').addEventListener('click', logOut);
    }else{
        document.getElementById('user').style.display = 'none';
    }
})

function logOut(){
    sessionStorage.clear();
    window.location ='./index.html';
}