// Dependencies
const assign = require('lodash').assign;
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gutil');
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

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
      component: basePaths.dev + 'js/component/**/*.js',
      plugin: basePaths.dev + 'js/plugin/**/*.js',
      constants: basePaths.src + 'js/constants/**/*.js',
      redux: basePaths.dev + 'js/redux/**/*.js',
      container: basePaths.dev + 'js/container/**/*.js',
      store: basePaths.dev + 'js/store/**/*.js',
    },
    img: basePaths.dev + 'img/**/*.+(png|jpg|gif|svg)',
    font: basePaths.dev + 'fonts/**/*',
    html: rootPaths.dev + '*.html'
  },
  dev: {
    css: basePaths.dev + 'css/',
    js: {
      root: basePaths.dev + 'js/',
      component: basePaths.dev + 'js/component/',
      plugin: basePaths.dev + 'js/plugin/',
      constants: basePaths.dev + 'js/constants/',
      redux: basePaths.dev + 'js/redux/',
      container: basePaths.dev + 'js/container/',
      store: basePaths.dev + 'js/store/',
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

// Concat React components
const entries = {
  index: paths.dev.js.store + 'index.js',
};

const b = function(storeKey) {
  const customOpts = {
    entries: entries[storeKey],
    debug: false,
    storeKey: storeKey
  };
  const opts = assign({}, watchify.args, customOpts);

  return browserify(opts).transform(babelify, {
    presets: [
      'react',
      'es2015',
      'stage-2'
    ]
  });
};
const watchIndex = watchify(b('index'));

function bundle(pkg) {
  const bundleName = pkg._options.storeKey;

  return pkg.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(bundleName +'.js'))
    .pipe(gulp.dest(paths.dev.js.root))
    .pipe(browserSync.stream({once: true}));
}

gulp.task('reactIndex', bundle.bind(null, b('index')));
gulp.task('reactWatchIndex', bundle.bind(null, watchIndex));
gulp.task('reactWatch', ['reactWatchIndex']);

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
    .pipe(browserSync.stream({once: true}));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: rootPaths.dev
    },
  })
});

// Watch Files For Changes
gulp.task('watch', ['sass', 'reactWatch'], function() {
  // Any SASS changes
  gulp.watch(paths.src.scss, ['sass', browserSync.reload]);
  gulp.watch(paths.src.html, [browserSync.reload]);
  // Any react changes
  watchIndex.on('log', gutil.log);
  watchIndex.on('update', bundle.bind(null, watchIndex));
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
              'reactIndex', 'concatPlugins',
    ['styles', 'scripts', 'images', 'fonts'],
    'copyHTML',
    callback
  );
});

gulp.task('default', ['sass', 'concatPlugins', 'watch'], function (callback) {
  runSequence('browserSync', callback);
});
