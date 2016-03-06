var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var webpack = require('gulp-webpack')

gulp.task('default', ['build'])

gulp.task('build',
  [
    'build:html',
    'build:js',
    'build:images',
    'build:css'
  ])

gulp.task('build:html', function() {
  return gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('./public'))
})

gulp.task('build:js', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(webpack(
      {
        output: { filename: './js/main.js' },
        devtool: '#source-map'
      }
    ))
    .pipe(gulp.dest('./public'))
})

gulp.task('build:images', function() {
  return gulp
    .src('./src/images/*')
    .pipe(gulp.dest('./public/images'))
})

gulp.task('build:css', function() {
  return gulp
    .src('./src/**/*.css')
    .pipe(gulp.dest('./public'))
})

gulp.task('watch', ['default'], function () {
    gulp.watch('./src/**/*.html', ['build:html'])
    gulp.watch('./src/css/*.css', ['build:css'])
    gulp.watch('./src/**/*.js', ['build:js'])
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    })
    gulp.watch("./public/**/*").on('change', browserSync.reload)
})
