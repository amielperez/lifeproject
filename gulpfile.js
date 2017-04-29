var gulp = require('gulp'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    lint = require('gulp-eslint'),
    sass = require('gulp-sass');


// TODO: externalize
// configure server
var embedlr = require('gulp-embedlr'),
  express = require('express');
  serverPort = 5000;
  path = require('path');

// TODO: externalize
// configure live reload server
var refresh = require('gulp-livereload'),
  lrServer = require('tiny-lr')(),
  liveReload = require('connect-livereload');
  liveReloadPort = 5001;


var server = express();
server.use(liveReload({ port: liveReloadPort }));
server.use(express.static('/dist'));
server.use('/assets', express.static(path.join(__dirname + '/dist/assets')));
server.all('/', (req, res) => {
  res.sendFile('index.html', { root: 'dist' })
});

gulp.task('watch', ['lint'], () => {
  gulp.watch(
    ['app/index.html', 'app/features/**/*.tmpl.html', 'app/common/**/*.tmpl.html'],
    ['views']
  );

  gulp.watch(
    ['app/common/**/*.js', 'app/features/**/*.js', 'app/config/*.js', 'app/*.js'],
    ['lint', 'bundle']
  );

  gulp.watch(['app/env.js'], ['env'])

  gulp.watch(['app/styles/*.css'], ['styles'])
});

gulp.task('styles', () => {
  return gulp.src(['app/styles/*.css'])
    .pipe(gulp.dest('dist/assets/styles'))
})

gulp.task('lint', () => {
  // return gulp.src(['app/common/*.js', 'app/features/*.js', 'app/app.js'])
  //   .pipe(lint())
  //   .pipe(lint.format())
})

gulp.task('env', () => {
  return gulp.src('app/env.js')
    .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('bundle', () => {
  return browserify('app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('views', () => {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'))

  gulp.src('app/**/**/*.tmpl.html')
    .pipe(gulp.dest('dist/assets/html'))
});

gulp.task('dev', () => {
  server.listen(serverPort)
  lrServer.listen(liveReloadPort)
  gulp.run('watch')
});
