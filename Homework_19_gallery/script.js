'use strict'

const ALBUM_CLASS = 'album';

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}';

const albumsEl = document.getElementById('albums');
const photosEl = document.getElementById('photos');

const photoTemplate = document.getElementById('photoTemplate').innerHTML;
const albumTemplate = document.getElementById('albumTemplate').innerHTML;

albumsEl.addEventListener('click', onAlbumsElClick);

init();

function init(){
    getAlbums()
}

function onAlbumsElClick(e) {
    if(e.target.classList.contains(ALBUM_CLASS)){
        getPhotos(e.target.dataset.id);
    }
}

function getAlbums(){
    return fetch(ALBUMS_URL)
        .then((res) => res.json())
        .then((data) => {
            renderAlbums(data);
            return data;
        })
        .then(getFirstAlbumPhotos);         
}

function renderAlbums(list){
    albumsEl.innerHTML = list
        .map((album) => getAlbumHtml(album))
        .join('');
        console.log(list)
}

function getAlbumHtml(album){
    return albumTemplate
    .replace('{{id}}', album.id)
    .replace('{{title}}',album.title);
}

function getFirstAlbumPhotos(list){
    if(list.length){
        getPhotos(list[0].id)
    }
}

function getPhotos(albumId){
    return fetch(getPhotosUrl(albumId))
        .then((res) => res.json())
        .then(renderPhotos);
}

function getPhotosUrl(albumId) {
    return PHOTOS_URL.replace('{{id}}', albumId);
}

function renderPhotos(list){
    photosEl.innerHTML = list
        .map((photo) => getPhotoHtml(photo))
        .join('');
        console.log(list)
}

function getPhotoHtml(photo){
    return photoTemplate
    .replace('{{url}}', photo.thumbnailUrl)
    .replace('{{title}}', photo.title);
}

