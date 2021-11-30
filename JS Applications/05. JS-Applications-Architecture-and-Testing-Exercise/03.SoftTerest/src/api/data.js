import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllIdeas(){
    return await api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
}

export async function getIdea(id){
    return await api.get('/data/ideas/'+id);
}

export async function createIdea(idea){
    return await api.post('/data/ideas', idea);
}

export async function deleteIdea(id){
    return await api.del('/data/ideas/'+id);
}