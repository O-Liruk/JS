const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students';

const SUBMIT_STUDENT_INPUT_SELECTOR = '#submit-student-input';
const ADD_STUDENT_SELECTOR = '#add_student';
const NEW_STUDENT_SECTION_SELECTOR = '.new-student-section';
const NEW_STUDENT_INPUT_SELECTOR = '#new-student-input';
const STUDENT_MARK_SELECTOR = '.student_mark';
const SHOW_CLASS = 'show';
const DELETE_BTN_CLASS = 'delete-btn';


const taskList = document.getElementById('taskList');
const taskMarks = document.getElementById('task_marks');
const taskTemplate = document.querySelector('#taskStudentsTemplate').innerHTML;
const creatNewStudent = document.getElementById('#creat_new_student');

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(SUBMIT_STUDENT_INPUT_SELECTOR).addEventListener('click', onAddStudentClick);
    document.querySelector(ADD_STUDENT_SELECTOR).addEventListener('click', showNewStudentInput);
});

taskList.addEventListener('click',onDellStudentClick)

init();

let list = [];

function onMarkFocusOut(e) {
    const inputValue = e.target.value;

    const studentId = this.getAttribute('data-student-id');
    const markIndex = Number(this.getAttribute('data-index'));
    
    const student = list.find(st => st.id === studentId);

    student.marks = student.marks.map((mark, index) => {
      return index === markIndex ? inputValue : mark;
    });

    editStudent(student);
}

function editStudent(student) {
    fetch(`${URL}/${student.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
}

function showNewStudentInput() {
    const newStudentSection = document.querySelector(NEW_STUDENT_SECTION_SELECTOR);
    newStudentSection.classList.toggle(SHOW_CLASS)
}

function onAddStudentClick() {
   const studentInput = document.querySelector(NEW_STUDENT_INPUT_SELECTOR);
   newStudent(studentInput.value);
}

function newStudent (name) {
    const sticker = {
        name,
        marks: [],
    }
    fetch(URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(sticker),
                })
              .then(getList)
}

function renderStudent(sticker){
    stickerrr = getStudentHtml(sticker)
     taskList.append(stickerrr);
}

function init() {
    getList();
}
function getList() {
    fetch(URL)
        .then((res) => res.json())
        .then(setData)
        .then(renderList);
}

function setData(data) {
    return (list = data);
}

function renderList(data) {
    console.log(data);
    taskList.innerHTML = data.map(getContactElementHtml).join('');

    document.querySelectorAll(STUDENT_MARK_SELECTOR).forEach(item => {
        item.addEventListener('focusout', onMarkFocusOut);
    });
}

function getMarksHtml (marks = [], studentId) {
    marks = marks || [];
    return marks.map((mark, index) => 
        `<input data-student-id="${studentId}" data-index="${index}" type="number" class="student_mark" value="${mark}">`
    );
}


function getContactElementHtml(item) {
    return taskTemplate
        .replace('{{name}}', item.name)
        .replace('{{id}}', item.id)
        .replace('{{marks}}', getMarksHtml(item.marks, item.id))
}

function onDellStudentClick(e){
    // console.log(e.target.classList.contains('delete-btn'));
    switch (true) {
        case e.target.classList.contains(DELETE_BTN_CLASS):
            deleteSticker(e.target.parentElement.dataset.id);
            break;
    }
}

function deleteSticker(id){
    list = list.filter((el) => el.id != id);

  deleteStickerElement(id);

  fetch(`${URL}/${id}`, {
      method: 'DELETE',
  }).then(getList);
}

function deleteStickerElement(id) {
    const element = getStickerElement(id);
  
    element && element.remove();
}

function getStickerElement(id) {
    // console.log(list);
    return list.find(elem => elem === `[data-id="${id}"]`);
}  

// function clearInput() {
//     taskInput.value = '';
// }
  