import { getUserData, setUserData, clearUserData } from '../util.js';

async function request(url, options) {
    try {
        const host = "http://localhost:3030/";
        const result = await fetch(host + url, options);
        if (result.ok != true) {
            if (result.status == 403) {
                clearUserData();
            }
            const error = await result.json();
            throw new Error(error.message);

        }
        if(result.status==204){
            return result;
        }
        return await result.json();
    } catch (error) {
        throw error;
    }
}

function createOptions(method = 'GET', data) {
    let options = {
        method: method,
        headers: {}
    };

    if (data) {
        options.headers['Content-type'] = 'Application/json';
        options.body = JSON.stringify(data);
    }
    const userData = getUserData();
    if (userData){
        options.headers['X-Authorization']=userData.token;
    }
    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return await request(url, createOptions('PUT', data));
}

export async function del(url) {
    return await request(url, createOptions('DELETE'), createOptions());
}

export async function login(email, password) {
    const user = await post('users/login', { email, password });
    const userData = {
        email: user.email,
        username: user.username,
        id: user._id,
        token: user.accessToken
    }
    setUserData(userData);
}

export async function register(email, username, password) {
    const user = await post('users/register', { email, username, password });

    const userData = {
        email: user.email,
        username: user.username,
        id: user._id,
        token: user.accessToken
    };
    setUserData(userData);
}

export async function logout() {
    await get('users/logout');

    clearUserData();
}