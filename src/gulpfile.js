var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('default', function () {
    return gulp.src('scripts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'index.js'
        }))
        .pipe(gulp.dest('..'));
});