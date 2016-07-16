let gulp    = require('gulp'),
    eslint  = require('gulp-eslint'),
    concat  = require('gulp-concat'),
    webpack = require('gulp-webpack'),
    babel   = require('gulp-babel'),
    react   = require('gulp-react'),
    size    = require('gulp-size'),
    connect = require('gulp-connect'),
    open    = require('gulp-open');

var webpackConfig = require('./webpack.dev.config.js');

gulp.task('lint', (done) => {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format());
        //.pipe(eslint.failAfterError());
});

gulp.task('css', () => {
    return gulp.src('src/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('scripts', () => {
    return gulp.src(webpackConfig.entry)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist'))
        .pipe(size({ title: 'scripts' }))
        .pipe(connect.reload());
});

gulp.task('serve', (done) => {
    connect.server({
        root: 'dist',
        port: 80,
        livereload: {
            port: 35728
        }
    });
    done();
});

gulp.task('watch', (done) => {
    gulp.watch(['./src/**/*.html'], gulp.parallel('html'));
    gulp.watch(['./src/**/*.js', './src/**/*.jsx'], gulp.parallel('lint', 'scripts'));
    done();
});

gulp.task('default', gulp.series(gulp.parallel('lint', 'scripts'), 'html', 
    gulp.parallel('serve', 'watch')));

gulp.task('build', gulp.series(gulp.parallel('lint', 'scripts'), 'html'));