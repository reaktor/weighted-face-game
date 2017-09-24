const gulp = require("gulp");
const babel = require("gulp-babel");
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task("watch", function(){
    gulp.watch('src/**/*', ['default']);
});

gulp.task('default', function() {
    browserify({
    entries: './src/main.js',
    debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public'));

    gulp.src('src/**/*')
    .pipe(gulp.dest('./public'));
});