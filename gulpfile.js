var gulp = require('gulp');

//Minify HTML
var html = require('gulp-htmlmin');

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(html())
        .pipe(gulp.dest('dist'));
});

//PUG - HTML
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./src'))
});

//SASS - CSS
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./src/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/assets/css/'))
});
gulp.task('sass:watch', () => {
    gulp.watch('./src/assets/css/style.scss', gulp.series('sass'));
});

//LESS - CSS
var less = require('gulp-less');

gulp.task('less', () => {
    return gulp.src('./src/assets/css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./src/assets/css'))
});
gulp.task('less:watch', () => {
    gulp.watch('./src/assets/css/**/*.less', gulp.series('less'));
});

//Clean CSS
var clean = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('cleanCSS', () => {
    return gulp.src('./src/assets/css/style.css')
        .pipe(clean())
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(gulp.dest('dist/assets/css'))
});

//Minify JS
var minify = require('gulp-minify');

gulp.task('minifyJS', () => {
    return gulp.src('./src/assets/js/**/*.js')
        .pipe(minify({
            ext: {
                min: '.js'
            },
        }))
        .pipe(gulp.dest('dist/assets/js'))
});

// Image - Minify
var imageMin = require('gulp-imagemin');

gulp.task('imageMin', () => {
    return gulp.src('./src/assets/images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('iconMin', () => {
    return gulp.src('./src/assets/icons/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/icons'))
});

//Browser Sync
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', () => {
    var files = [
        './src/**/*.html',
        './src/**/*.pug',
        './src/assets/css/**/*.scss',
        './src/assets/css/**/*.less',
        './src/assets/js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './src'
        }
    });

    gulp.watch(['./src/**/*.html'], reload);
    gulp.watch(['./src/**/*.pug'], gulp.series('pug'), reload);
    gulp.watch(['./src/assets/css/**/*.scss'], gulp.series('sass'), reload);
    gulp.watch(['./src/assets/css/**/*.less'], gulp.series('less'), reload);
    gulp.watch(['./src/assets/js/**/*.js'], reload);
});

//Gulp-Method
gulp.task('dev', gulp.series('serve'));
gulp.task('build', gulp.series('html', 'cleanCSS', 'minifyJS', 'imageMin', 'iconMin'));