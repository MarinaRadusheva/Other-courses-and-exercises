const url = 'http://localhost:3030/jsonstore/collections/books';
const listBody = document.querySelector('tbody');
const loadBtn = document.getElementById('loadBooks');
loadBtn.addEventListener('click', loadBooks);
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');
createForm.addEventListener('submit', createBook);
editForm.addEventListener('submit', editBook);


async function editBook(e){
    e.preventDefault();
    const _id = e.target.dataset.dataId;
    const formData = new FormData(editForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const updatedBook = {title, author, _id};
    const result = await updateBook(_id, updatedBook);
    editForm.style.display='none';
    createForm.style.display='block';
    loadBooks();
}

async function createBook(e){
    e.preventDefault();
    const formData = new FormData(createForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const newBook = {title, author};
    const result = await addBook(newBook);
    const newRow = makeRow(result._id, result);
    listBody.appendChild(newRow);
    createForm.querySelector('[name="title"]').value='';
    createForm.querySelector('[name="author"]').value='';
}

async function loadBooks(){
    const books = Object.entries(await getAllBooks());
    console.log(books);
    const rows = books.map(([key, value]) => makeRow(key, value));
    listBody.replaceChildren(...rows);
}

function makeRow(key,book){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>`;
    row.id=key;
    row.addEventListener('click',clicked);
    return row;
}

async function clicked(e){
    if(e.target.textContent == 'Delete'){
        const rowToDelete = (e.target.parentElement).parentElement;
        const key = rowToDelete.id;
        console.log(key);
        console.log(await deleteBook(key));
        listBody.removeChild(rowToDelete);
    }
    else if(e.target.textContent == 'Edit'){        
        createForm.style.display='none';
        editForm.style.display='block';
        const rowToUpdate = (e.target.parentElement).parentElement;
        const key = rowToUpdate.id;
        const book = await getBook(key);
        editForm.querySelector('[name="title"]').value=book.title;
        editForm.querySelector('[name="author"]').value=book.author;
        editForm.dataset.dataId=key;
        editForm.dataset.dataRow=rowToUpdate;
    }
}


async function getBook(key){
    return result = await request(url+'/'+key);

}

async function updateBook(key, book){
    const result = await request(url+'/'+key, {
        method: 'put',
        body: JSON.stringify(book)
    });

    return result;
}

async function deleteBook(key){
    const result = await request(url+'/'+key, {
        method: 'delete'
    });

    return result;
}

async function addBook(book){
    const result = await request(url, {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}

async function getAllBooks(){
    const books = await request(url);
    return books;
}

async function request(url, options){
    if(options && options.body!=undefined){
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const res = await fetch(url, options);

    if(res.status!=200){
        const error = await res.json();
        alert(error.message);
        throw new Error(error.message);
    }

    return await res.json();
}