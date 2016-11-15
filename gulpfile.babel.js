import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    clientBundle: 'dist/client-bundle.js?(.map)',
    libDir: 'lib',
    distDir: 'dist'
};

gulp.task('lint', () => {
    return gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
        paths.webpackFile
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
    return del([paths.libDir,
        paths.clientBundle,
    ])
});

gulp.task('main', ['clean'], () =>
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
