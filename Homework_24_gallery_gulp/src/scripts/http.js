'use strict';

class Http {
  constructor(albumsUrl, photosUrl ) {
    this._albumsUrl = albumsUrl;
    this._photosUrl = photosUrl;
  }
  
  getAlbums() {
    return fetch(this._albumsUrl)
        .then((resp) => resp.json())
        .then((albumsList) => {
            renderAlbums(albumsList);
            return albumsList;
        });
        
  }

  getPhotos(albumId) {
    return fetch(getPhotosUrl(albumId))
        .then((resp) => resp.json())
        .then(renderPhotos)
  }

  getPhotosUrl(albumId){
    return PHOTOS_URL.replace('{{id}}', albumId);
  }

  listAlbums() {
    return this.getAlbums();
  }

  listPhotos(id) {
    return this.getPhotos(id);
  }

  photosUrl(albumId){
    return this.getPhotosUrl(albumId)
  }
}