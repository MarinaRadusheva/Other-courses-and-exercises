import * as api from '../api/api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function createFurniture(item){
    return await api.post('/data/catalog', item);
}

export async function getAll(){
    return await api.get('/data/catalog');
}

export async function getDetails(id){
    return await api.get(`/data/catalog/${id}`);
}

export async function editFurniture(id, item){
    return await api.put(`/data/catalog/${id}`, item);
}

export async function deleteFurniture(id){
    return await api.del(`/data/catalog/${id}`);
}

export async function myFurniture(userId){
    return await api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}