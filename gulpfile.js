var gulp = require( 'gulp' );
var browserSync  = require('browser-sync');
var scss = require('gulp-sass');
var plumber = require( 'gulp-plumber' );
var notify = require( 'gulp-notify' );
var sassGlob = require( 'gulp-sass-glob' );
var mmq = require( 'gulp-merge-media-queries' );
var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssdeclsort = require( 'css-declaration-sorter' );

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./",
          index: "index.html"
      }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task( 'default', gulp.series( gulp.parallel( 'browser-sync' ) ), function() {
    gulp.watch( './*.html', gulp.task( 'bs-reload' ) );
    gulp.watch( './css/*.css', gulp.task( 'bs-reload' ) );
    gulp.watch( './js/*.js', gulp.task( 'bs-reload' ) );
});

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe( plumber({ errorHandler: notify.onError( 'Error: &lt;%= error.message %&gt;' )}) )
    .pipe( sassGlob() )
    .pipe( scss({outputStyle: 'expanded'}) )
    .pipe( postcss([autoprefixer()]) )
    .pipe( mmq() )
    .pipe( postcss([ cssdeclsort({ order: 'concentric-css' }) ]) )
    .pipe( gulp.dest('./css') );
});

gulp.task( 'watch', function() {
  gulp.watch( './scss/**/*.scss', gulp.task( 'sass' ) );
});