(function () {
  'use strict';
  var requirejs = require('requirejs'),
    gulp = require('gulp'),
    child_process = require('child_process'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    server = require('./core.js'),
    LESS_DIR = 'app/css',
    JS_DIR = 'app/js',
    CSS_DIST = 'public/stylesheets',
    JS_DIST = 'public/javascripts';

  gulp.task('clean', function (cb) {
    del('public/dist', cb);
  });

  gulp.task('images', ['clean'], function () {
    return gulp.src('app/img/*')
        .pipe(imagemin({ optimizationLevel: 0 }))
        .pipe(gulp.dest('public/images'));
  });

  gulp.task('vendor', ['clean'], function () {
    return gulp.src('vendor/requirejs/require.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/vendor'));
  });

  gulp.task('css', ['clean'], function () {
    return gulp.src(LESS_DIR + '/main.less')
        .pipe(changed(CSS_DIST))
        .pipe(less())
        .pipe(gulp.dest(CSS_DIST));
  });

  gulp.task('js', ['clean'], function () {
    return requirejs.optimize({
        baseUrl: JS_DIR,
        include: ['app.js'],
        out: JS_DIST + '/app.js',
        paths: {
          jquery: '../../vendor/jquery/dist/jquery',
          underscore: '../../vendor/underscore/underscore',
          backbone: '../../vendor/backbone/backbone'
        },
        waitSeconds: 15,
        optimize: 'uglify2',
        generateSourceMaps: true,
        preserveLicenseComments: false,
        useSourceUrl: true
      });
  });

  gulp.task('build', ['clean', 'css', 'js', 'vendor', 'images']);

  gulp.task('watch', function () {
    server();
    gulp.watch('app/**/*', ['build']);
  });

  gulp.task('server', server);

  gulp.task('default', ['build', 'watch']);
}());