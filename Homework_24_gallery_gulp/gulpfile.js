const {src, dest, series, parallel} = require('gulp')
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

function cleanDist() {
  return src('./dist/',{read: false})
    .pipe(clean());
}

function copyHtml() {
  return src('./src/index.html')
    .pipe(dest('./dist'));
}

function copyCss() {
  return src('./src/**/*.css')
    .pipe(concat('all.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./dist'));
}

function copyJs() {
  return src('./src/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./dist'));
}

module.exports = {
  build: series(cleanDist, parallel (copyHtml, copyCss, copyJs))
}