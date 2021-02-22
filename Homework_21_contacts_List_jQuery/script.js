'use strict';

$(() => {
  const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';
  const EDIT_BTN_SELECTOR = '.edit-btn';
  const DELETE_BTN_SELECTOR = '.delete-btn';
  const CONTACT_SELECTOR = '.contact';

  const $contactForm = $('#contact-form');
  const $contactId = $('#contactId');
  const $contactName = $('#name');
  const $contactSurname = $('#surname');
  const $contactPhone = $('#phone');
  const $contactListElement = $('#contactList');
  const contactTemplate = $('#contactTemplate').html();

  let contactList = [];

  $('#addBtn').on('click', onAdBtnElClick);
  $('#contactList')
    .on('click', DELETE_BTN_SELECTOR, onDeleteContactClick)
    .on('click', EDIT_BTN_SELECTOR, onUpdateContactClick);

  const $formDialog = $('#form-modal').dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      Save: () => {
        saveContact(),
        closeModal()
      },
      Cancel: closeModal,
      },
    close:() => clearForm()
    });

  init();

  function onAdBtnElClick() {
    openModal();
  }
  
  function onDeleteContactClick(event) {
    const $element = getContactElement($(this));
    deleteContact(getElementIndex($element));
  }  

  function onUpdateContactClick(event) {
    openModal();
    const $element = getContactElement($(this));
    editContact(getElementIndex($element))
  }

  function init(){
    getContacts();
  }
  
  function getContacts() {
    request(CONTACTS_URL)
    .then(setContacts)
    .then(renderList);
  }
  
  function request(url, method = 'GET', data) {
    return fetch(url, {
      method,
      body: data && JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    })
    .then((response) => (response.ok ? response.json() : Promise.reject()))
    .catch(() => getContacts());
  }

  function setContacts(list) {
    return (contactList = list);
  }
    
  function renderList(contactList) {
    contactList.forEach(renderContacts);
  }

  function renderContacts(contact) {
    const $contactElement = $(generateContactHtml(contact));
    $contactListElement.append($contactElement);
  } 

  function generateContactHtml(contact) {
    return contactTemplate
      .replace('{{id}}', contact.id)
      .replace('{{name}}', contact.name)
      .replace('{{surname}}', contact.surname)
      .replace('{{phone}}', contact.phone);
  }

  function openModal() {
    $formDialog.dialog('open');
  }
  
  function closeModal() {
    $formDialog.dialog('close');
  }

  function saveContact() {
    const newContact = getContact();
    if (newContact.id) {
      updateContact(newContact);
    } else {
      addContact(newContact);
    }  
  }

  function getContact() {
    return {
      id: $contactId.val(),
      name: $contactName.val(),
      surname: $contactSurname.val(),
      phone:$contactPhone.val()
    }
  }

  function addContact(contact) {
    delete contact.id
    request(CONTACTS_URL, 'POST', contact)
    .then((contact) => {
      contactList.push(contact);
      renderContacts(contact);
    });
  }

  function deleteContact(contactId) {
    contactList = contactList.filter((contact) => contact.id != contactId);
    deleteContactElement(contactId);
    request(CONTACTS_URL + contactId, 'DELETE');
  }

  function updateContact(contact) {
    request(CONTACTS_URL + contact.id, 'PUT', contact)
    contactList = contactList.map((el) => (el.id != contact.id ? el : contact));
    deleteContactElement(contact.id);
    renderContacts(contact);
  }

  function deleteContactElement(contactId) {
    const $element = getContactElementId(contactId);
    $element && $element.remove();
  }

  function getContactElementId(id) {
    return $contactListElement.find(`[data-id="${id}"]`);
  }

  function editContact(contactId) {
    const contact = contactList.find((contact) => contact.id == contactId);
    fillForm(contact);
  }

  function fillForm(obj) {
    $contactId.val(obj.id)
    $contactName.val(obj.name)
    $contactSurname.val(obj.surname)
    $contactPhone.val(obj.phone);
  }

  function getContactElement($element) {
    return $element.closest(CONTACT_SELECTOR);
  }

  function getElementIndex($element) {
    const $contactItem = getContactElement($element);
    return $contactItem && $contactItem.data('id');
  }

  function clearForm() {
    $contactForm [0].reset();
  }
})