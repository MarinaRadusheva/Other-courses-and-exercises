window.addEventListener('load', populateTable)
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', addStudent);
const tableBody = document.querySelector('tbody');

async function populateTable(){
    
    const students = await getStudents();
    const rows = students.map(s=>makeRow(s));
    console.log(rows);
    rows.forEach(r=>tableBody.appendChild(r));
}

function makeRow(studentObj){
    const studentData = Object.values(studentObj);
    studentData.pop();
    const newRow = document.createElement('tr');
    studentData.forEach(s=>{
        let newCell = document.createElement('td');
        newCell.textContent=s;
        newRow.appendChild(newCell);
    })
    newRow.lastChild.textContent = Number(newRow.lastChild.textContent).toFixed(2);
    return newRow;
}

function addStudent(e){
    e.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');
    if(firstName && lastName && facultyNumber && grade){
        const newStudent = {firstName, lastName, facultyNumber, grade};

        fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        })
        .then(res => {
            if(res.status!=200){
                throw new Error(res.json().status)
            }
            return res.json();
        })
        .then(data => {
            tableBody.appendChild(makeRow(data));
            let fields = Array.from(document.querySelectorAll('.inputs input'));
            fields.map(s=>s.value = '');
        })
        .catch(error => {
            alert(error.message);
        })
    
    }else{
        alert('All fields must be filled');
    }
}

async function getStudents(){
    
    try{
        const res = await fetch('http://localhost:3030/jsonstore/collections/students');
        if(res.status!=200){
            throw new Error(res.json().status)
        }
        return Object.values(await res.json());
    }catch(error){
        alert(error.message)
    };
}