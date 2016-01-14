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
  vendorJS: [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/flexslider/jquery.flexslider-min.js',
    './node_modules/wow/dist/wow.min.js',
  ],
  vendorCSS: [
    './node_modules/reset.css/reset.css',
    './node_modules/animate.css/animate.min.css',
    './node_modules/font-awesome/css/font-awesome.min.css',
  ],
  vendorFonts: [
    './node_modules/font-awesome/fonts/*.*'
  ]
};

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
    .pipe($.newer(config.buildRoot))
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
    .pipe($.newer(config.buildRoot))
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
    .pipe($.newer(config.buildRoot))
    .pipe(gulp.dest(config.buildRoot + 'fonts/'));
});

gulp.task('json', function() {
  return gulp.src(config.srcRoot + '**/[^!]*.json')
    .pipe($.plumber())
    .pipe($.newer(config.buildRoot))
    .pipe(gulp.dest(config.buildRoot));
});

gulp.task('json-watch', ['json'], function () {
  browserSyncInstance.reload();
});


gulp.task('js', ['js-vendor', 'js-partial']);

gulp.task('js-vendor', function() {
  return gulp.src(config.vendorJS)
    .pipe($.plumber())
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest(config.buildRoot + 'js/'));
});

gulp.task('js-partial', function() {
  return gulp.src(config.srcRoot + 'js/partial/[^!]*.js')
    .pipe($.plumber())
    .pipe($.concat('partial.js'))
    .pipe($.babel())
    .pipe(gulp.dest(config.buildRoot + 'js/'));
});

gulp.task('js-partial-watch', ['js-partial'], function () {
  browserSyncInstance.reload();
});

gulp.task('css', function() {
  return gulp.src(config.vendorCSS)
    .pipe($.plumber())
    .pipe($.concat('vendor.css'))
    .pipe(gulp.dest(config.buildRoot + 'css/'));
});

gulp.task('stylus', function() {
  return gulp.src(config.srcRoot + 'stylus/main.styl')
    .pipe($.plumber())
    .pipe($.stylus({
      compress: true
      }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
      }))
    .pipe($.concat('styles.min.css'))
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
  gulp.watch(config.srcRoot + '**/[^!]*.js', ['js-partial-watch']);
  gulp.watch(config.srcRoot + '**/[^!]*.styl', ['stylus']);
});

gulp.task('build', [
  'photos',
  'imageOptim',
  'stylus',
  'css',
  'js',
  'json',
  'html',
  'php',
  'fonts',
]);

gulp.task('default', ['watch']);
