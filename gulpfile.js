'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
      pattern: ['*']
    });

var bs = $.browserSync.create();
var config = {
  buildRoot: './build/',
  srcRoot: './src/',
  proxyAdress: 'http://veterok.dev/',
  libVendorJS: {
    },
  libVendorAssets: {
  }
};

gulp.task('browserSync', function(cb) {
  bs.init({
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

gulp.task('html', function() {
  return gulp.src(config.srcRoot + '**/[^!]*.html')
    .pipe($.plumber())
    .pipe($.newer(config.buildRoot))
    .pipe($.htmlmin({
      collapseWhitespace: true
      }))
    .pipe(gulp.dest(config.buildRoot));
});

gulp.task('fonts', function() {
  var lib = {
    fontAwesome: './node_modules/font-awesome/fonts/*.*'
    };
  return gulp.src(lib.fontAwesome)
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

gulp.task('js', ['js-vendor', 'js-partial']);

gulp.task('js-partial', function() {
  return gulp.src(config.srcRoot + 'js/partial/[^!]*.js')
    .pipe($.plumber())
    .pipe($.concat('partial.js'))
    .pipe(gulp.dest(config.buildRoot + 'js/'));
});

gulp.task('js-vendor', function() {
  var lib = {
    jquery: './node_modules/jquery/dist/jquery.min.js',
    flexslider: './node_modules/flexslider/jquery.flexslider-min.js',
    wow: './node_modules/wow/dist/wow.min.js',
    };
  return gulp.src([lib.jquery,
                  lib.flexslider,
                  lib.wow])
    .pipe($.plumber())
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest(config.buildRoot + 'js/'));
});

gulp.task('css', function() {
  var lib = {
    reset: './node_modules/reset.css/reset.css',
    animate: './node_modules/animate.css/animate.min.css',
    fontAwesome: './node_modules/font-awesome/css/font-awesome.min.css',
    };
  return gulp.src([lib.reset, lib.animate, lib.fontAwesome])
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
    .pipe(gulp.dest(config.buildRoot + 'css/'));
});

gulp.task('imageOptim', function () {
  return gulp.src(config.srcRoot + 'img/*')
    .pipe($.plumber())
    .pipe($.imagemin({
      progressive: true,
      // svgoPlugins: [{removeViewBox: false}]
      }))
    .pipe(gulp.dest(config.buildRoot + 'img/'));
});

gulp.task('photos', function () {
  return gulp.src(config.srcRoot + 'photo/**/*')
    .pipe($.plumber())
    .pipe(gulp.dest(config.buildRoot + 'photo/'));
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.srcRoot + '**/[^!]*.php', ['php']);
  gulp.watch(config.srcRoot + '**/[^!]*.html', ['html']);
  gulp.watch(config.srcRoot + '**/[^!]*.json', ['json']);
  gulp.watch(config.srcRoot + '**/[^!]*.js', ['js']);
  // gulp.watch(config.srcRoot + '**/[^!]*.css', ['css']);
  gulp.watch(config.srcRoot + '**/[^!]*.styl', ['stylus']);
  gulp.watch(config.buildRoot + '**/*').on('change', bs.reload);
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
