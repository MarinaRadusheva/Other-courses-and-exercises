import { addMemberRequest, approveMembership, deleteMember, getTeamById, getTeamMembers } from '../api/data.js';
import { html} from '../lib.js';

const detailsTemplate = (team, user, isOwner, showButtons, pendingRequests) => html`
         <section id="team-home">
                <article class="layout">
                    <img src=${team.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${team.members.length} ${team.members.length == 1 ? 'Member' : 'Members'}</span>
                        ${user ? showButtons(team, user.id) : ''}
                        
                        
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            ${team.members.filter(s=>s.status=='member').map(m=>html`<li>${m.user.username} 
                            ${(isOwner && m.user.username!=user.username) 
                                ? html`<a @click=${m.decline} href="javascript:void(0)" class="tm-control action">Remove from team</a>` 
                                : '' }
                                </li>`)}
                        </ul>
                    </div>
                    ${isOwner ? pendingTemplate(pendingRequests) : ''}
                   
                </article>
            </section>`

const pendingTemplate = (pendingRequests) => html`
         <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                        ${pendingRequests.map(p=>html`<li>${p.user.username}
                        <a @click=${p.approve} href="javascript:void(0)" class="tm-control action">Approve</a>
                        <a @click=${p.decline} href="javascript:void(0)"class="tm-control action">Decline</a></li>`)}
                        </ul>
                    </div>`

export async function detailsPage(ctx){
    const teamId = ctx.params.id; 
    

    ctx.render(await populateTemplate(teamId));

     async function populateTemplate(teamId){
        const user = ctx.userData;
        let [team, allRequests] = await Promise.all([
            getTeamById(teamId),
            getTeamMembers(teamId)
        ]);

        team.members=allRequests.filter(m=>m.status=='member').map(m=>{
            m.decline = (e) => leave(e, m._id);
            return m;
        });
        console.log(team.members);
        const isOwner = user ? (user.id==team._ownerId) : false;
        const pendingRequests = allRequests.filter(m=>m.status=='pending').map(p => {
            p.approve = (e) => approveRequest(e, p);
            p.decline = (e) => leave(e, p._id);
            return p;
        });
        console.log(pendingRequests);

        return detailsTemplate(team, user, isOwner, showButtons, pendingRequests);

        function showButtons(team, userId){
            const memberShip = allRequests.find(m=>m.user._id==userId);
            console.log(`ther is a membership${memberShip}}`);
            if(userId==team._ownerId){
                return html`<div>
                <a href="/edit/${team._id}" class="action">Edit team</a></div> `
            } else if(team.members.some(m=>m.user._id==userId)){
                return html`<div><a @click=${e=>leave(e, memberShip._id)} href="javascript:void(0)" class="action invert">Leave team</a></div> `;
            } else if(pendingRequests.some(m=>m.user._id==userId)){
                return html`<div>Membership pending. <a @click=${e=>leave(e, memberShip._id)} href="javascript:void(0)">Cancel request</a></div> `;
            }  else {
                return html`<div><a @click=${e=>join(e, team._id)} href="javascript:void(0)" class="action">Join team</a></div> `;
            }             
            
        }
        
        async function leave(ev, id){
            await deleteMember(id);
         ctx.render(await populateTemplate(teamId));
        }
        async function join(ev, id){
            await addMemberRequest(id);
         ctx.render(await populateTemplate(teamId));
        }

        async function approveRequest(ev, request){
            await approveMembership(request);
            ctx.render(await populateTemplate(teamId));
        }
    }
    
}