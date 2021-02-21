'use strict'

const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers'

const DELETE_STICKER_SELECTOR = '.delete_sticker_btn'
const EDIT_STICKER_SELECTOR = '.sticker_value'

const $steckerListEl = $('#sticker_list')
const $addStickerBtn = $('#heder_edd_note_btn')
const $stickerTemplate = $('#stickerTemplate').html()

let list = []

$addStickerBtn.on('click', onAddStickerBtnClick)

$steckerListEl.on('click', DELETE_STICKER_SELECTOR, onSteckerListElClick)
$steckerListEl.on('focusout', EDIT_STICKER_SELECTOR, onSteckerListElFocusout)

init()

function init() {
  getList()
}

function onAddStickerBtnClick() {
  createStiker()
}

function onSteckerListElClick(e) {
  const $el = $(this).parent()
  deleteSticker(($el.data('id')))
}

// function onSteckerListElClick(e){
//   switch (true) {
//     case e.target.classList.contains(DELETE_STICKER_CLASS):
//         deleteSticker(e.target.parentElement.dataset.id)
//         break
//   }
// }

function onSteckerListElFocusout(e) {
  const $element = $(this);

  updateSticker($element.parent().data('id'), {
    description: $element.val(),
  })

  // updateSticker(
  //   $el.parentElement.dataset.id,
  //   $el.name,
  //   $el.value
  // )

}

function updateSticker(id, name) {
  const sticker = list.find((el) => el.id == id)

  Object.keys(name).forEach((key) => (sticker[key] = name[key]));

  // sticker[name] = value

  fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sticker),
  });
}

function getList() {
  fetch(URL)
    .then((res) => res.json())
    .then(setData)
    .then(renderList);
}

function setData(data) {
  return (list = data)
}

function getStickerElement(id) {
  return $steckerListEl.find(`[data-id="${id}"]`)
}

function createStiker() {
  const sticker = {
    description: '',
  };

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sticker),
  })
    .then((res) => res.json())
    .then((sticker) => {
      list.push(sticker)
      renderSticker(sticker)
    });
}

function deleteSticker(id) {
  list = list.filter((el) => el.id != id)

  deleteStickerElement(id)

  fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
}

function deleteStickerElement(id) {
  const $element = getStickerElement(id)

  $element && $element.remove()
}

function renderList(list) {
  list.forEach(renderSticker)
}

function renderSticker(sticker) {
  const $noteElement = $(getStickerHtml(sticker))
  $steckerListEl.append($noteElement)
}

function getStickerHtml(sticker) {
  return $stickerTemplate
    .replace('{{id}}', sticker.id)
    .replace('{{description}}', sticker.description)
}