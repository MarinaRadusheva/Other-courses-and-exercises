import * as api from '../api/api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(album){
    return api.post('/data/albums', album);
}

export async function getAlbum(id){
    return api.get(`/data/albums/${id}`);
}

export async function editAlbum(id, album){
    return api.put(`/data/albums/${id}`, album)
}

export async function deleteAlbum(id){
    return api.del(`/data/albums/${id}`);
}

export async function searchAlbums(searchText){
    return api.get(`/data/albums?where=name%20LIKE%20%22${searchText}%22`);
}
