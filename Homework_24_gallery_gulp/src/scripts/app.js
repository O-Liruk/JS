
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}';

const ALBUM_ITEM_CLASS = 'album-item';

const albumsEl = document.querySelector('#albums');
const photosEl = document.querySelector('#photos');

const albumItemTemplate = document.querySelector('#albumItemTemplate')
    .innerHTML;
const photoItemTemplate = document.querySelector('#photoItemTemplate')
    .innerHTML;

albumsEl.addEventListener('click', onAlbumsClick);

const http = new Http (ALBUMS_URL, PHOTOS_URL);

init();

function init() {
    getAlbums().then(getFirstAlbumPhotos);
}

function getAlbums() {
    return http.listAlbums()
}

function renderAlbums(data) {
    albumsEl.innerHTML = data
        .map((album) => generateAlbumHtml(album))
        .join('\n');
}

function generateAlbumHtml(album) {
    return albumItemTemplate
        .replace('{{id}}', album.id)
        .replace('{{title}}', album.title);
}

function getFirstAlbumPhotos(data) {
    if (data.length) {
        getPhotos(data[0].id);
    }
}

function getPhotos(albumId) {
    return http.listPhotos(albumId)
}

function getPhotosUrl(albumId) {
    return http.photosUrl(albumId);
}

function renderPhotos(data) {
    photosEl.innerHTML = data
        .map((photo) => generatePhotoHtml(photo))
        .join('\n');
}

function generatePhotoHtml(photo) {
    return photoItemTemplate
        .replace('{{url}}', photo.thumbnailUrl)
        .replace('{{title}}', photo.title);
}

function onAlbumsClick(e) {
    if (e.target.classList.contains(ALBUM_ITEM_CLASS)) {
        getPhotos(e.target.dataset.id);
    }
}
