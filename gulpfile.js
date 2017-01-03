var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var es = require('event-stream');

var sourcePath = "app/";
var distPath = "dist/";

var stylesSourcePath = sourcePath + "sass/";
var scriptsSourcePath = sourcePath + "scripts/";
var cssOutput = distPath + "styles";
var scriptsOutput = distPath + "scripts";

gulp.task('sass', function(){
  return gulp.src('app/scss/*.scss')
        .pipe(sass())
          .pipe(gulp.dest(cssOutput));

});

gulp.task('uglify', function(){
  return gulp.src(scriptsSourcePath)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
          .pipe(gulp.dest(scriptsOutput));

});

gulp.task('webpack', function() {
  return gulp.src(scriptsSourcePath + "main.js")
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsOutput));
});

gulp.task('watch', function(){
  gulp.watch(sourcePath + "/**/*", ['default']);
});


gulp.task('copy-static', function(){
    var rootHtml = gulp.src('app/*.html');
    var componentsHtml = gulp.src('app/**/*.html');
    var images = gulp.src('app/**/*.svg');

    return es.merge([rootHtml, componentsHtml, images])
          .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del([
    'dist/**'  ],  {'force':true});
});

gulp.task('default',['sass', 'webpack', 'copy-static']);
