'use strict';
const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';

const DELETE_BTN_CLASS = 'delete-btn';
const CONTACT_ROW_SELECTOR = '.contact-row';

const contactForm = document.querySelector('#newContactForm');
const contactsList = document.querySelector('#contactsList');
const contactTemplate = document.querySelector('#contactTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

contactForm.addEventListener('submit', onContactFormSubmit);
contactsList.addEventListener('click', onContactsListClick);

let list = [];

init();

function init() {
    getList();
}

function getList(){
        fetch(URL)
            .then((res) => res.json())  
            .then(createContactList) 
            .then(renderList);          
}
function createContactList(data){
    return (list = data)
}

function renderList(data){
    contactsList.innerHTML = data.map(generateContactHtml).join('');
}

function onContactFormSubmit(e) {
    e.preventDefault();

    const newContact = getContact();

    if (isContactValid(newContact)) {
        addContact(newContact);
        resetForm();
    } else {
        alert('Not valid');
    }
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        deleteItem(getElementId(e.target));
    }
}

function getElementId(element) {
    return element.closest(CONTACT_ROW_SELECTOR).dataset.id;
}

function deleteItem(id) {
    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    });

    list = list.filter((item) => item.id != id);

    renderList(list);
}

function getContact() {
    const contact = {};

    formInputs.forEach((inp) => {
        contact[inp.name] = inp.value;
    });

    return contact;
}

function isContactValid(contact) {
    return (
        isFieldValid(contact.name) &&
        isFieldValid(contact.surname) &&
        isPhoneFieldValid(contact.phone)
    );
}

function isFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isFieldValid(value) && !isNaN(value);
}

function generateContactHtml(contact) {
    return contactTemplate
        .replace('{{id}}', contact.id)
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{phone}}', contact.phone);
}

function addContact(contact) {

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        })
            .then((res) => res.json())
            .then((data) => {
                list.push(data);
                renderList(list);
                resetForm();
            });
}

function resetForm() {
    contactForm.reset();
}
