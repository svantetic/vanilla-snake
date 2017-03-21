var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var config = {
	sourceDirectory: 'src/**/*.js',
	destDirectory: 'dist'
}

gulp.task('default', function() {
	return gulp.src(config.sourceDirectory)
	    .pipe(sourcemaps.init())
	    .pipe(babel())
	    .pipe(sourcemaps.write("."))
	    .pipe(gulp.dest(config.destDirectory));
});

gulp.watch(config.sourceDirectory, ['default']);