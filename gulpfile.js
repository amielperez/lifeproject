var gulp = require('gulp')

// TODO: externalize
// configure server
var embedlr = require('gulp-embedlr'),
  express = require('express')
  serverPort = 5000
  path = require('path')

// TODO: externalize
// configure live reload server
var refresh = require('gulp-livereload'),
  lrServer = require('tiny-lr')(),
  liveReload = require('connect-livereload')
  liveReloadPort = 5001


var server = express()
server.use(liveReload({ port: liveReloadPort }))
server.use(express.static('/dist'))
server.use('/assets', express.static(path.join(__dirname + '/dist/assets')))
server.all('/', (req, res) => {
  res.sendFile('index.html', { root: 'dist' })
})

gulp.task('watch', () => {
  gulp.watch(
    ['app/index.html'],
    ['views']
  )
})

gulp.task('browserify')

gulp.task('views', () => {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'))
})

gulp.task('dev', () => {
  server.listen(serverPort)
  lrServer.listen(liveReloadPort)
  gulp.run('watch')
})
