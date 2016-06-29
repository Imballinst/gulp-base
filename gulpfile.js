// Dependencies

const gulp = require('gulp');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

// constiables

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

gulp.task('useref', function(){
  return gulp.src(paths.html)
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

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
    ['sass', 'useref', 'images', 'fonts'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['scss','browserSync', 'watch'],
    callback
  )
})