/* global require */

var gulp = require('gulp');

var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var streamqueue = require('streamqueue');
var jscs = require('gulp-jscs');

gulp.task('minify', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
              gulp.src('./src/*.html')
                  .pipe(minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                  }))
                  .pipe(templateCache({
                    module: 'schemaForm',
                    root: 'directives/decorators/bootstrap/angucomplete/'
                  }))
    );
  stream.queue(gulp.src('./src/*.js'));

  stream.done()
        .pipe(concat('bootstrap-angucomplete.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));

});

gulp.task('non-minified-dist', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
              gulp.src('./src/*.html')
                  .pipe(templateCache({
                    module: 'schemaForm',
                    root: 'directives/decorators/bootstrap/angucomplete/'
                  }))
    );
  stream.queue(gulp.src('./src/*.js'));

  stream.done()
        .pipe(concat('bootstrap-angucomplete.js'))
        .pipe(gulp.dest('.'));

});

gulp.task('jscs', function() {
  gulp.src('./src/**/*.js')
      .pipe(jscs());
});

gulp.task('default', [
  'minify',
  'non-minified-dist',
  'jscs'
]);

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['default']);
});
