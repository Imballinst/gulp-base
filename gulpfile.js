// Dependencies

var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// Variables

var basePaths = {
  dev: 'dev/assets/',
  dst: 'dist/assets/'
};

var paths = {
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