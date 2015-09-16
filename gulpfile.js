'use strict';

const path = require('path');
const gulp = require('gulp');

const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');
const uncss = require('gulp-uncss');

const minifyHTML = require('gulp-minify-html');

gulp.task('less', function () {
    return gulp.src(path.join(__dirname, '/src/less/*.less'))
        .pipe(less({
            paths: [ path.join(__dirname, '/node_modules/bootstrap/dist') ]
        }))
        .pipe(uncss({
            html: path.join(__dirname, '/src/index.html')
        }))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(path.join(__dirname, '/dist/css')));
});

gulp.task('html', function() {
    return gulp.src(path.join(__dirname, '/src/*.html'))
        .pipe(minifyHTML())
        .pipe(gulp.dest(path.join(__dirname, '/dist')));
});

gulp.task('default', ['less', 'html']);