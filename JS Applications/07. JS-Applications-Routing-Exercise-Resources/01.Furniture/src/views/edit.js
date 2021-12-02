import { editFurniture, getDetails } from '../api/data.js';
import { html, until} from '../lib.js';

const editTemplate = (itemPromise) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        ${until(itemPromise, html`<div>Loading ...</div>`)}`;

const itemTemplate = (item, onSubmit, errObj) => html`
    <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                ${errObj ? html`<div class="form-group error">${Object.values(errObj).join(', ')}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${errObj ? (errObj.make ? 'is-invalid' : 'is-valid') : 'valid'}" id="new-make" type="text" name="make" value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${errObj ? (errObj.model ? 'is-invalid' : 'is-valid') : 'valid'}" id="new-model" type="text" name="model" value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${errObj ? (errObj.year ? 'is-invalid' : 'is-valid') : 'valid'}" id="new-year" type="number" name="year" value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${errObj ? (errObj.description ? 'is-invalid' : 'is-valid') : 'valid'}" id="new-description" type="text" name="description" value=${item.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${errObj ? (errObj.price ? 'is-invalid' : 'is-valid') : 'valid'}" id="new-price" type="number" name="price" value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${errObj ? (errObj.img ? 'is-invalid' : 'is-valid') : 'valid'}" id="new-image" type="text" name="img" value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`

export function editPage(ctx){
    const id = ctx.params.id;
    ctx.render(editTemplate(loadItem(id, onSubmit)));

    async function onSubmit(ev){
        ev.preventDefault();

        const errorObj = {};
        const formData = new FormData(ev.target);

        const make = formData.get('make').trim();
        const model = formData.get('model').trim();
        const year = formData.get('year').trim();
        const description = formData.get('description').trim();
        const price = formData.get('price').trim();
        const img = formData.get('img').trim();
        const material = formData.get('material').trim();
        try {
            if(make.length<4){
                errorObj.make='Make must be more than 3 characters';
            }
            if(model.length<4){
                errorObj.model='Model must be more than 3 characters';
            }
            if(!year || !Number(year) || Number(year)<1950 || Number(year)>2050){
                errorObj.year='Year must be between 1950 and 2050';
            } 
            if(description.length<=10){
                errorObj.description='Description must be more than 10 characters';
            }
            if(!price || Number(price)<0){
                errorObj.price='Price must be a positive number';
            }
            if(!img){
                errorObj.img='Img is required';
            }
            if(Object.entries(errorObj).length!=0){
                console.log(Object.entries(errorObj));
                throw new Error('Please check info');
            }
            await editFurniture(id, {make, model, year, description, price, img, material});
            ctx.page.redirect('/');
        } catch (error) {
            errorObj.err = `${error.message}`;
            ctx.render(editTemplate(loadItem(id, onSubmit, errorObj)));
        }
    }
}

async function loadItem(id, onSubmit, errObj){
    const item = await getDetails(id);
    return itemTemplate(item, onSubmit, errObj);
}