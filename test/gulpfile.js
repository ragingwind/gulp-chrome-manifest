var gulp = require('gulp');
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var manifest = require('../');

function logger() {
	return through.obj(function(file, enc, cb) {
		console.log('log:', file.path);
		this.push(file)
		cb();
  });
};

gulp.task('clean', function() {
	del.sync(['.tmp']);
});

gulp.task('default', ['clean'], function() {
	return gulp.src('fixtures/manifest.json')
		.pipe(manifest({
			buildnumber: true,
	    exclude: [
	      'key'
	    ],
	    background: {
    		target: 'scripts/background.js',
    		exclude: [
    			'scripts/not-exist-test-script1.js',
    			'scripts/willbe-remove-only-for-debug.js',
    			'components/jquery/jquery.min.js',
    		]
    	},
		}))
		.pipe(logger())
		.pipe(gulpif('*.css', cssmin()))
  	.pipe(gulpif('*.js', sourcemaps.init()))
  	.pipe(gulpif('*.js', uglify()))
  	.pipe(gulpif('*.js', sourcemaps.write()))
		.pipe(gulp.dest('.tmp'));
});
