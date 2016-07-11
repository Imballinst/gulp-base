// Dependencies

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

// Variables

const basePaths = {
  dev: 'dev/assets/',
  dst: 'dist/assets/'
};

const paths = {
  src: {
    scss: basePaths.dev + 'scss/**/*.scss',
    js: basePaths.dev + 'js/**/*.js',
    img: basePaths.dev + 'img/**/*.+(png|jpg|gif|svg)',
    font: basePaths.dev + 'fonts/**/*'
  },
  dst: {
    css: basePaths.dst + 'css',
    js: basePaths.dst + 'js/**/*.js',
    img: basePaths.dst + 'img',
    font: basePaths.dst + 'fonts',
  },
  html: 'dev/*.html'
};

// Precompile and Watch

gulp.task('sass', function(){
  return gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dst.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  })
});

gulp.task('watch', function (){
  gulp.watch(paths.src.scss, ['scss']);
  gulp.watch(paths.html, browserSync.reload);
  gulp.watch(paths.src.js, browserSync.reload);
  // Other watchers
});

// Minify Javascript and Stylesheets
// TODO: complete

// Minify Images and Fonts

gulp.task('images', function(){
  return gulp.src(paths.src.img)
  .pipe(imagemin({
    verbose: true
  }))
  .pipe(gulp.dest(paths.dst.img))
});

gulp.task('fonts', function() {
  return gulp.src(paths.src.font)
  .pipe(gulp.dest(paths.dst.font))
});

// Clear Folder Dist
gulp.task('clean:dist', function() {
  return del.sync('dist/');
});

// Clear Image Cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// Build Dist and Run Development

gulp.task('build', function(callback) {
  runSequence('clean:dist', 
    // TODO: add concat css and js, +minify
    ['sass', 'images', 'fonts'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['scss','browserSync', 'watch'],
    callback
  )
})