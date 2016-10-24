// Dependencies

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

// Variables

const rootPaths = {
  dev: 'dev/',
  dst: 'dist/'
}

const basePaths = {
  dev: rootPaths.dev + 'assets/',
  dst: rootPaths.dst + 'assets/'
};

const paths = {
  src: {
    scss: basePaths.dev + 'scss/**/*.scss',
    css: basePaths.dev + 'css/**/*.css',
    js: {
      root: basePaths.dev + 'js/*.js',
      casual: basePaths.dev + 'js/casual/*.js',
      plugin: basePaths.dev + 'js/plugin/*.js',
    },
    img: basePaths.dev + 'img/**/*.+(png|jpg|gif|svg)',
    font: basePaths.dev + 'fonts/**/*',
    html: rootPaths.dev + '*.html'
  },
  dev: {
    css: basePaths.dev + 'css/',
    js: {
      root: basePaths.dev + 'js/',
      casual: basePaths.dev + 'js/casual/',
      plugin: basePaths.dev + 'js/plugin/',
    },
    img: basePaths.dev + 'img/',
    font: basePaths.dev + 'fonts/'
  },
  dst: {
    css: basePaths.dst + 'css/',
    js: basePaths.dst + 'js/',
    img: basePaths.dst + 'img/',
    font: basePaths.dst + 'fonts/',
    html: rootPaths.dst
  }
};

// Casual custom javascript (non-react)

gulp.task('casualIndex', function() {
  return gulp.src(paths.src.js.casual)
    .pipe(concat('casual.js'))
    .pipe(gulp.dest(paths.dev.js.root));
});

// Concat plugins

gulp.task('concatPlugins', function() {
  return gulp.src(paths.src.js.plugin)
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest(paths.dev.js.root));
});

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
  gulp.watch(paths.src.js.casual, ['casualIndex']);
  gulp.watch(paths.html, browserSync.reload);
  gulp.watch(paths.src.js.root, browserSync.reload);
  // Other watchers
});

// Copy HTML

gulp.task('copyHTML', function() {
  return gulp.src(paths.src.html)
    .pipe(htmlreplace({
        'css': 'assets/css/main.min.css',
        'js': 'assets/js/main.min.js'
    }))
    .pipe(gulp.dest(paths.dst.html));
});

// Minify Javascript and Stylesheets

gulp.task('styles', function() {
  return gulp.src(paths.src.css)
    .pipe(concat('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dst.css));
});

gulp.task('scripts', function() {
  return gulp.src(paths.src.js.root)
    .pipe(concat('main.min.js'))
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
  runSequence('clean:dist', 'sass',
              'casualIndex',
              'concatPlugins',
    ['styles', 'scripts', 'images', 'fonts'], 
    'copyHTML',
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['sass',
               'casualIndex', 'concatPlugins', 'browserSync', 'watch'],
    callback
  );
});