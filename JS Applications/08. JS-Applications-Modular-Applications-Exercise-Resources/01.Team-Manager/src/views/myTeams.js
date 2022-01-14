import {teamTemplate} from './catalog.js';
import {html } from '../lib.js';
import { getMembersOfParticularTeams, getMyTeams } from '../api/data.js';

const myTeamsTemplate = (teams) => html`
        <section id="my-teams">

            <article class="pad-med">
                <h1>My Teams</h1>
            </article>
            ${teams.length == 0 
                ? html`
                    <article class="layout narrow">
                        <div class="pad-med">
                            <p>You are not a member of any team yet.</p>
                            <p><a href="/catalog">Browse all teams</a> to join one, or use the button bellow to cerate your own
                                team.</p>
                        </div>
                        <div class=""><a href="/create" class="action cta">Create Team</a></div>
                    </article>` 
                : teams.map(teamTemplate)}
        </section>`

export async function myTeamsPage(ctx){
    const user = ctx.userData;
    const memberShips = await getMyTeams(user.id);
    
    const teams = memberShips.map(m=>m.team);

    if(teams.length!=0){
        const ids = teams.map(t => `"${t._id}"`).join(',');
        const queryString = encodeURIComponent(`teamId IN (${ids}) AND status="member"`);
        const members = await getMembersOfParticularTeams(queryString);
        const reducedMembers = members.reduce(function (acc, curr) {
        return acc[curr.teamId] ? ++acc[curr.teamId] : acc[curr.teamId] = 1, acc
        }, {});
        teams.forEach(t=>{
        t.members = reducedMembers[t._id];
        })
    }   

    ctx.render(myTeamsTemplate(teams));
}