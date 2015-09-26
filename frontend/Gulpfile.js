var gulp = require('gulp'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  livereload = require('gulp-livereload');

gulp.task('js', function () {
  gulp.src('js/**/*.jsx')
    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(livereload())
    .pipe(gulp.dest('js'));
});

gulp.task('scss', function () {
  gulp.src('css/**/*.scss')
    .pipe(livereload())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
})

gulp.task('default', function () {
  livereload.listen();

  gulp.watch('js/**/*.jsx', ['js'])
  gulp.watch('css/**/*.scss', ['scss'])
});
