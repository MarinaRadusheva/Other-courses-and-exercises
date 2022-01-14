import * as api from './api.js';

export function login(email, password){
    return api.login(email, password);
}
export function register(email, username, password){
    return api.register(email, username, password);
}
export function logout(email, password){
    return api.logout(email, password);
}

export async function getTeams(){
    return await api.get('data/teams');
}

export async function getTeamById(id){
    return await api.get('data/teams/'+id);
}

export async function editTeam(id,team){
    return await api.put(`data/teams/${id}`, team);
}

export async function getMembers(){
    return await api.get('data/members?where=status%3D%22member%22');
}

export function createTeam(team){
    return api.post('data/teams', team);
}

export async function getTeamMembers(teamId){
    return await api.get(`data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}

export async function deleteMember(id){
    return await api.del(`data/members/${id}`);
}

export async function addMemberRequest(teamId){
    return await api.post(`data/members/`, {teamId});
}

export async function approveMembership(membership){
    const body = {
        teamId: membership.teamId,
        status: 'member'
    }
    return await api.put(`data/members/${membership._id}`, body);
}

export async function getMyTeams(userId){
    return await api.get(`data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
}

export async function getMembersOfParticularTeams(queryString){
    return api.get(`data/members?where=${queryString}`);
}