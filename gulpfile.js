var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var sass = require('gulp-sass');

var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


var arrJsFiles = [
	'src/js/jquery.min.js', 
	'src/js/test1.js', 
	'src/js/test2.js'
]
//concatenate JS files
gulp.task('scripts', function() {
	return gulp.src(arrJsFiles) // gulp.src(['src/js/*.js', 'src/js/plugins/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});


gulp.task('images', function() {
	return gulp.src('src/images/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
	.pipe(gulp.dest('build/img'));
})


gulp.task('watch', function() {
	gulp.watch(arrJsFiles, ['scripts']);
	gulp.watch('src/scss/*.scss', ['sass']);
	// gulp.watch('src/images/**/*', ['images']);
});


gulp.task('sass', function() {
	return gulp.src('src/scss/*')
	.pipe(concat('styles.css'))
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('build/css'));
})


/*gulp.task('sass', function() {
	return sass('src/scss/style.scss', {style: 'compressed'})
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/css'));

});*/

// default task
gulp.task('default', ['scripts', 'images', 'sass', 'watch']);
// gulp.task('default', ['scripts', 'sass']);


// FULL VERSION

// // Include gulp
// var gulp = require('gulp');
//  // Define base folders
// var src = 'src/';
// var dest = 'build/';
//  // Include plugins
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var sass = require('gulp-ruby-sass');
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');
//  // Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src(src + 'js/*.js')
//       .pipe(concat('main.js'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(uglify())
//         .pipe(gulp.dest(dest + 'js'));
// });
//  // Compile CSS from Sass files
// gulp.task('sass', function() {
//     return sass('src/scss/style.scss', {style: 'compressed'})
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('build/css'));
// });
//  gulp.task('images', function() {
//   return gulp.src(src + 'images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
//     .pipe(gulp.dest(dest + 'img'));
// });
//  // Watch for changes in files
// gulp.task('watch', function() {
//    // Watch .js files
//   gulp.watch(src + 'js/*.js', ['scripts']);
//    // Watch .scss files
//   gulp.watch(src + 'scss/*.scss', ['sass']);
//    // Watch image files
//   gulp.watch(src + 'images/**/*', ['images']);
//  });
//  // Default Task
// gulp.task('default', ['scripts', 'sass', 'images', 'watch']);