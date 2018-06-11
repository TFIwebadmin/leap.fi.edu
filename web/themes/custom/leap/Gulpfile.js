var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('styles', function () {
  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(autoprefixerOptions)]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'));
});

//Watch task
gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['styles']);
});

//Watch task
gulp.task('default', ['styles']);
