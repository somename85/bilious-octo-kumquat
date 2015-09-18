'use strict';

const path = require('path');
const gulp = require('gulp');

const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');
const uncss = require('gulp-uncss');
const autoprefixer = require('gulp-autoprefixer');

const minifyHTML = require('gulp-minify-html');

const ignoreSelectorsRegExp = /^\.?(schedule|subscribe-window|share-window).*/;

gulp.task('distLess', function () {
    return gulp.src(path.join(__dirname, '/src/less/*.less'))
        .pipe(less({
            paths: [ path.join(__dirname, '/node_modules/bootstrap/less') ]
        }))
        .pipe(gulp.dest(path.join(__dirname, '/public/css')));
});

gulp.task('srcLess', function () {
    return gulp.src(path.join(__dirname, '/src/less/*.less'))
        .pipe(less({
            paths: [ path.join(__dirname, '/node_modules/bootstrap/less') ]
        }))
        .pipe(gulp.dest(path.join(__dirname, '/src/css')));
});

gulp.task('html', ['distLess'], function() {
    return gulp.src(path.join(__dirname, '/src/*.html'))
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(gulp.dest(path.join(__dirname, '/public')));
});

gulp.task('distCss', ['html'], function() {
    return gulp.src(path.join(__dirname, '/public/css/*.css'))
        .pipe(uncss({
            ignore: [ignoreSelectorsRegExp],
            html: [path.join(__dirname, '/public/index.html')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(path.join(__dirname, '/public/css')));
});

gulp.task('srcCss', ['srcLess'], function() {
    return gulp.src(path.join(__dirname, '/src/css/*.css'))
        .pipe(uncss({
            ignore: [ignoreSelectorsRegExp],
            html: [path.join(__dirname, '/src/index.html')]
        }))
        .pipe(gulp.dest(path.join(__dirname, '/src/css')));
});



gulp.task('dist', ['distCss']);
gulp.task('src', ['srcCss']);