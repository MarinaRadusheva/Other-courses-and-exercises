import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const section = document.getElementById('allCats');
let catsData = cats;
catsData.forEach(c => c.info = false);

const template = (catsData) =>
    html`<ul>${catsData.map(cat =>
        html`<li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${() => toggleInfo(cat)}>${cat.info ? "Hide" : "Show"} status code</button>
             ${cat.info ? html`<div class="status" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>` : null}
        </div>
    </li>`)}
    </ul>`;

function update() {
    render(template(catsData), section);
}
update();

function toggleInfo(cat) {
    cat.info = !cat.info;
    update();
}

