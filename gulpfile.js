// Dependencies

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
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
    css: basePaths.dev + 'css/**/*.css',
    js: basePaths.dev + 'js/**/*.js',
    img: basePaths.dev + 'img/**/*.+(png|jpg|gif|svg)',
    font: basePaths.dev + 'fonts/**/*'
  },
  dev: {
    css: basePaths.dev + 'css/',
    js: basePaths.dev + 'js/',
    img: basePaths.dev + 'img/',
    font: basePaths.dev + 'fonts/'
  },
  dst: {
    css: basePaths.dst + 'css/',
    js: basePaths.dst + 'js/',
    img: basePaths.dst + 'img/',
    font: basePaths.dst + 'fonts/',
  },
  html: 'dev/*.html'
};

// Precompile and Watch

gulp.task('sass', function(){
  return gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dev.css))
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

gulp.task('styles', function() {
  console.log(paths.dst.css);
  return gulp.src(paths.src.css)
    .pipe(concat('main.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dst.css));
});

gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dst.js));
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
    ['sass', 'styles', 'scripts', 'images', 'fonts'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  );
});