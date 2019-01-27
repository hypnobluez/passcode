var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

//CLEAN CSS FOLDER
gulp.task('clean', function () {
    return del(['src/css/**/*.css']);
});

// COMPILE SASS INTO CSS
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// COPY OVER BOOTSTRAP JS FILES INTO SRC/JS
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

//COPY OVER FONT AWESOME FILES NITO FONTS/
gulp.task('fonts', function () {
    return gulp.src([
        './node_modules/font-awesome/**/*',
        '!./node_modules/font-awesome/{less,less/*}',
        '!./node_modules/font-awesome/{scss,scss/*}',
        '!./node_modules/font-awesome/.*',
        '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
        .pipe(gulp.dest('./src/fonts/font-awesome'))
});

// MINIFY CSS
gulp.task('css:minify', function cssMinify() {
    return gulp.src('./src/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
});


// GULP SERVE FOR DEV PURPOSES
gulp.task('serve', gulp.series('clean', 'sass', 'css:minify', function () {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("src/**/*.html").on('change', browserSync.reload);
}));

//DEFAULT GULP TASK
gulp.task('default', gulp.parallel('js', 'fonts', 'serve'));