var gulp = require('gulp'),
    newer = require('gulp-newer'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "veterok.loc",
    notify: false
  });
});

gulp.task('build', function() {
  gulp.src('./src/**/[^!]*')
    .pipe(gulp.dest('./www'));
});

gulp.task('php', function() {
  gulp.src('./src/**/[^!]*.php')
    .pipe(newer('./www'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www'));
});

gulp.task('html', function() {
  gulp.src('./src/**/[^!]*.html')
    .pipe(newer('www/'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www'));
});

gulp.task('json', function() {
  gulp.src('./src/**/[^!]*.json')
    .pipe(newer('./www'))
    .pipe(gulp.dest('./www'));
});

gulp.task('js', ['js-vendor', 'js-partial']);

gulp.task('js-partial', function() {
  gulp.src('./src/js/partial/[^!]*.js')
    .pipe(newer('./www/js/partial'))
    .pipe(gulp.dest('./www/js/partial'));
});

gulp.task('js-vendor', function() {
  var lib = {
    jquery: './bower_components/jquery/dist/jquery.min.js',
    flexslider: './bower_components/flexslider/jquery.flexslider-min.js',
    wow: './bower_components/wow/dist/wow.min.js'
    };
  gulp.src([lib.jquery, lib.flexslider, lib.wow])
    .pipe(newer('./www/js/vendor/'))
    .pipe(gulp.dest('./www/js/vendor/'));
  gulp.src('./src/js/vendor/modernizr.js')
    .pipe(newer('./www/js/vendor/'))
    .pipe(gulp.dest('./www/js/vendor/'));
});

gulp.task('css', function() {
  gulp.src('./src/**/[^!]*.css')
    .pipe(newer('./www'))
    .pipe(autoprefixer({
      browsers: ['> 1%']
    }))
    .pipe(gulp.dest('./www'));
});

// gulp.task('css-watch', ['css'], browserSync.reload);

gulp.task('stylus', function() {
  gulp.src('src/stylus/partials/colors.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(csscomb())
    // .pipe(newer('www/css'))
    // .pipe(rename('style.min.css'))
    .pipe(gulp.dest('www/css/partials'));
});

gulp.task('imageOptim', ['build'], function () {
  return gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('www/img'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/[^!]*.php', ['php']);
  gulp.watch('src/**/[^!]*.html', ['html']);
  gulp.watch('src/**/[^!]*.json', ['json']);
  gulp.watch('src/**/[^!]*.js', ['js']);
  gulp.watch('src/**/[^!]*.css', ['css']);
  gulp.watch('src/**/[^!]*.styl', ['stylus']);
  gulp.watch('www/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
