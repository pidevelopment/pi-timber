// Initialize Gulp and plugins
var	gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync')
	reload = browserSync.reload
;

// Configure our project settings
var config = {
	domain: "http://loc.veteranslendinggroup.com/",
	port: 31415,
	assetPath: "./lib/",
	stylesPath: "scss/app.scss",
};

// Style task
gulp.task('styles', function() {
	gulp.src("./lib/scss/app.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./lib/css/'))
});

// Browser Sync task
gulp.task('browser-sync', function() {
	var files = [
		'./lib/css/app.css',
		'./*.php',
		'./views/*.twig'
	];

	browserSync.init(files, {
		proxy: config.domain,
		notify: false,
		port: config.port
	});
});

// Watch task
gulp.task('watch', ['styles', 'browser-sync'], function() {
	gulp.watch('./lib/scss/**/*.scss', ['styles']);
});