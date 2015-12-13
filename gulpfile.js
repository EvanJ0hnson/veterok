'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
      pattern: ['*']
    });

var bs = $.browserSync.create();
var config = {
  buildRoot: './www/',
  srcRoot: './src/',
  proxyAdress: 'veterok.loc.ru',
  libVendorJS: {
    },
  libVendorAssets: {
  }
};

gulp.task('sync', function(cb) {
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
  return gulp.src(config.srcRoot + 'fonts/*')
    .pipe($.plumber())
    .pipe($.newer(config.buildRoot))
    .pipe(gulp.dest(config.buildRoot + 'fonts'));
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
    .pipe($.newer(config.buildRoot + 'js/partial'))
    .pipe(gulp.dest(config.buildRoot + 'js/partial'));
});

gulp.task('js-vendor', function() {
  var lib = {
    jquery: './bower_components/jquery/dist/jquery.min.js',
    flexslider: './bower_components/flexslider/jquery.flexslider-min.js',
    wow: './bower_components/wow/dist/wow.min.js'
    };
  return gulp.src([lib.jquery, lib.flexslider, lib.wow])
    .pipe($.plumber())
    .pipe($.newer(config.buildRoot + 'js/vendor/'))
    .pipe(gulp.dest(config.buildRoot + 'js/vendor/'));
  return gulp.src(config.srcRoot + 'js/vendor/modernizr.js')
    .pipe($.plumber())
    .pipe($.newer(config.buildRoot + 'js/vendor/'))
    .pipe(gulp.dest(config.buildRoot + 'js/vendor/'));
});

gulp.task('css', function() {
  return gulp.src(config.srcRoot + 'css/vendor/*.css')
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
    .pipe(gulp.dest(config.buildRoot + 'img'));
});

gulp.task('photos', function () {
  return gulp.src(config.srcRoot + 'photo/**/*')
    .pipe($.plumber())
    .pipe(gulp.dest(config.buildRoot + 'photo'));
});

gulp.task('watch', ['sync'], function() {
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
                  'php'
                  // 'fonts'
]);

gulp.task('default', ['watch']);
