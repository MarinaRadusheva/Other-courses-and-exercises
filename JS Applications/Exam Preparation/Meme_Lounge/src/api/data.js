import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return await api.get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(item){
    return await api.post('/data/memes', item);
}

export async function getMeme(id){
    return await api.get(`/data/memes/${id}`);
}

export async function editMeme(id, item){
    return await api.put(`/data/memes/${id}`, item);
}

export async function deleteMeme(id){
    return await api.del(`/data/memes/${id}`);
}

export async function getUserMemes(userId){
    return await api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

