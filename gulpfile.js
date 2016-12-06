// Dependencies
const assign = require('lodash').assign;
const babelify = require('babelify');
const browserify = require('browserify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const historyApiFallback = require('connect-history-api-fallback')
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

// Variables
const rootPaths = {
  res: 'resources/',
  dev: 'public/',
  prod: 'public/'
}

const basePaths = {
  res: rootPaths.res + 'assets/',
  dev: rootPaths.dev + 'dev/assets/',
  prod: rootPaths.prod + 'dist/assets/'
};

const paths = {
  res: {
    dir: {
      scss: basePaths.res + 'scss/',
      js: {
        component: basePaths.res + 'js/component/',
        plugin: basePaths.res + 'js/plugin/',
        constants: basePaths.res + 'js/constants/',
        redux: basePaths.res + 'js/redux/',
        container: basePaths.res + 'js/container/',
        store: basePaths.res + 'js/store/',
      },
      img: basePaths.res + 'img/',
      font: basePaths.res + 'fonts/'
    },
    files: {
      scss: basePaths.res + 'scss/**/*.scss',
      js: {
        component: basePaths.res + 'js/component/**/*.js',
        plugin: basePaths.res + 'js/plugin/**/*.js',
        constants: basePaths.res + 'js/constants/**/*.js',
        redux: basePaths.res + 'js/redux/**/*.js',
        container: basePaths.res + 'js/container/**/*.js',
        store: basePaths.res + 'js/store/**/*.js',
      },
      img: basePaths.res + 'img/**/*.+(png|jpg|gif|svg)',
      font: basePaths.res + 'fonts/**/*'
    }
  },
  dev: {
    css: basePaths.dev + 'css/',
    js: basePaths.dev + 'js/',
    img: basePaths.dev + 'img/',
    font: basePaths.dev + 'fonts/'
  },
  prod: {
    css: basePaths.prod + 'css/',
    js: basePaths.prod + 'js/',
    img: basePaths.prod + 'img/',
    font: basePaths.prod + 'fonts/'
  }
};

// Concat React components
const entries = {
  index: paths.res.dir.js.store + 'index.js',
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
    .pipe(gulp.dest(paths.dev.js));
}

gulp.task('reactIndex', bundle.bind(null, b('index')));
gulp.task('reactWatchIndex', bundle.bind(null, watchIndex));
gulp.task('reactWatch', ['reactWatchIndex']);

// Concat plugins
gulp.task('concatPlugins', function() {
  return gulp.src(paths.res.files.js.plugin)
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest(paths.dev.js));
});

// Precompile and Watch
gulp.task('sass', function(){
  return gulp.src(paths.res.files.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dev.css));
});

// Watch Files For Changes
gulp.task('watch', ['concatPlugins', 'sass', 'reactWatch'], function() {
  // Any SASS changes
  gulp.watch(paths.res.scss, ['sass']);
  // Any react changes
  watchIndex.on('log', gutil.log);
  watchIndex.on('update', bundle.bind(null, watchIndex));
});

// Minify Javascript and Stylesheets
gulp.task('styles', function() {
  return gulp.src(paths.dev.css)
    .pipe(concat('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.prod.css));
});

gulp.task('scripts', function() {
  return gulp.src(paths.dev.js)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.prod.js));
});

// Minify Images and Fonts
gulp.task('images', function(){
  return gulp.src(paths.res.files.img)
  .pipe(imagemin({}))
  .pipe(gulp.dest(paths.prod.img))
});

gulp.task('fonts', function() {
  return gulp.src(paths.res.files.font)
  .pipe(gulp.dest(paths.prod.font))
});

// Clear Folder Dist
gulp.task('clean:dist', function() {
  return del.sync(basePaths.prod);
});

// Clear Image Cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// Build dist
gulp.task('default', ['concatPlugins', 'watch'], function (callback) {
  runSequence('clean:dist', 'sass',
              'reactIndex', 'concatPlugins',
    ['styles', 'scripts', 'images', 'fonts'],
    'copyHTML',
    callback
  );
});
