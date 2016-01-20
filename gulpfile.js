'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
      pattern: ['*']
    });

var browserSyncInstance = $.browserSync.create();
var config = {
  buildRoot: './build/',
  srcRoot: './src/',
  proxyAdress: 'http://veterok.dev/',
  vendorCSS: [
    './node_modules/reset.css/reset.css',
    './node_modules/animate.css/animate.min.css',
    './node_modules/font-awesome/css/font-awesome.min.css',
    './node_modules/flexslider/flexslider.css',
  ],
  vendorFonts: [
    './node_modules/font-awesome/fonts/*.*',
    './node_modules/flexslider/fonts/*.*',
  ]
};
$.hbsfy.configure({
  extensions: ["hbs"]
});

gulp.task('browserSync', function(cb) {
  browserSyncInstance.init({
    proxy: config.proxyAdress,
    open: false,
    notify: false,
    ghostMode: false
  }, cb);
});

gulp.task('php', function() {
  return gulp.src(config.srcRoot + '**/[^!]*.php')
    .pipe($.plumber())
    .pipe($.htmlmin({
      collapseWhitespace: true
      }))
    .pipe(gulp.dest(config.buildRoot));
});

gulp.task('php-watch', ['php'], function () {
  browserSyncInstance.reload();
});


gulp.task('html', function() {
  return gulp.src(config.srcRoot + '**/[^!]*.html')
    .pipe($.plumber())
    .pipe($.htmlmin({
      collapseWhitespace: true
      }))
    .pipe(gulp.dest(config.buildRoot));
});

gulp.task('html-watch', ['html'], function () {
  browserSyncInstance.reload();
});


gulp.task('fonts', function() {
  return gulp.src(config.vendorFonts)
    .pipe($.plumber())
    .pipe(gulp.dest(config.buildRoot + 'fonts/'));
});

gulp.task('json', function() {
  return gulp.src(config.srcRoot + '**/[^!]*.json')
    .pipe($.plumber())
    .pipe(gulp.dest(config.buildRoot));
});

gulp.task('json-watch', ['json'], function () {
  browserSyncInstance.reload();
});

gulp.task('js', function() {
  return $.browserify(config.srcRoot + 'js/partial/scripts.js')
    .transform($.babelify)
    .transform($.hbsfy)
    .bundle()
    .pipe($.vinylSourceStream('partial.js'))
    .pipe(gulp.dest(config.buildRoot + 'js/'));
});

gulp.task('js-watch', ['js'], function () {
  browserSyncInstance.reload();
});

gulp.task('css', function() {
  return gulp.src(config.vendorCSS)
    .pipe($.plumber())
    .pipe($.concat('vendor.min.css'))
    .pipe($.postcss([
      $.cssnano({safe: true})
    ]))
    .pipe(gulp.dest(config.buildRoot + 'css/'));
});

gulp.task('stylus', function() {
  return gulp.src(config.srcRoot + 'stylus/main.styl')
    .pipe($.plumber())
    .pipe($.stylus())
    .pipe($.concat('styles.min.css'))
    .pipe($.postcss([
      $.autoprefixer({browsers: ['last 2 versions']}),
      $.cssnano({safe: true})
    ]))
    .pipe(gulp.dest(config.buildRoot + 'css/'))
    .pipe(browserSyncInstance.stream());
});

gulp.task('imageOptim', function () {
  return gulp.src(config.srcRoot + 'img/*')
    .pipe($.plumber())
    .pipe($.imagemin({
      progressive: true,
      }))
    .pipe(gulp.dest(config.buildRoot + 'img/'));
});

gulp.task('photos', function () {
  return gulp.src(config.srcRoot + 'photo/**/*')
    .pipe($.plumber())
    .pipe(gulp.dest(config.buildRoot + 'photo/'));
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.srcRoot + '**/[^!]*.php', ['php-watch']);
  gulp.watch(config.srcRoot + '**/[^!]*.html', ['html-watch']);
  gulp.watch(config.srcRoot + '**/[^!]*.json', ['json-watch']);
  gulp.watch(config.srcRoot + '**/[^!]*.js', ['js-watch']);
  gulp.watch(config.srcRoot + '**/[^!]*.styl', ['stylus']);
});

gulp.task('clean', function (cb) {
  $.del.sync(config.buildRoot + '*');
  cb();
});

gulp.task('build', function (cb) {
  $.runSequence('clean', [
    'photos',
    'imageOptim',
    'stylus',
    'css',
    'js',
    'json',
    'html',
    'php',
    'fonts',
    ], cb);
});

gulp.task('serve', ['watch']);
