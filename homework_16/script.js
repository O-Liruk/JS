'use strict';

const USER_URL = 'https://api.github.com/users/{{login}}';
const form = document.querySelector('#form').addEventListener('submit', onButtonClick);
const input = document.querySelector('#input');
const listLiEl = document.querySelector('#list_li').innerHTML;
const informationList = document.querySelector('#information-list');

function onButtonClick(event) {
  event.preventDefault();
  fetch(USER_URL.replace('{{login}}', input.value))
    .then((res) => {
      clearInput();
      return res.json();
    })
    .then((data) => {
      renderUser(data);
    })
    .catch((error) => console.error(error));
}

function renderUser(data) {
  const dataHTML = renderNewUserHTML(data);
  informationList.innerHTML = dataHTML;
}

function renderNewUserHTML(data) {
  return  listLiEl
    .replace('{{avatar}}', data.avatar_url)
    .replace('{{open_repositories}}', data.public_repos)
    .replace('{{followers}}', data.followers)
    .replace('{{following}}', data.following);
}

function clearInput() {
  input.value = '';
}