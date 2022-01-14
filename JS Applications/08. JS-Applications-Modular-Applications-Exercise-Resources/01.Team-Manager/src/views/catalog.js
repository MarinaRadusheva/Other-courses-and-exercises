import { getTeams, getMembers } from '../api/data.js';
import { html} from '../lib.js';

const catalogTemplate = (user, teams) => html`
        <section id="browse">

            <article class="pad-med">
                <h1>Team Browser</h1>
            </article>
            ${user 
                ? html`<article class="layout narrow">
                        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                    </article>`
                    : ""}            
        ${teams.map(teamTemplate)}
        </section>`;

export const teamTemplate = (team) => html`
        <article class="layout">
                <img src=${team.logoUrl} class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${team.name}</h2>
                    <p>${team.description}</p>
                    <span class="details">${team.members} ${(team.members==1) ? "Member" : "Members"}</span>
                    <div><a href="/details/${team._id}" class="action">See details</a></div>
                </div>
            </article>`;

export async function catalogPage(ctx){
    let teams = await getTeams();
    const members = await getMembers();
    teams.forEach(t => {const teamMembers = members.filter(m=>m.teamId==t._id).length;
        t.members = teamMembers;    
    });
    ctx.render(catalogTemplate(ctx.userData, teams));

}