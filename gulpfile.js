const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
sass.compiler = require('dart-sass');

//Utilidades de CSS

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

//Utilidades de JS

const terser = require('gulp-terser-js');


const paths = {
    imagenes: 'src/img/**/*',
    scss: "./src/scss/**/*.scss",
    js: 'src/js/**/*.js'
}

function compilarSASS(  ){
    return src(paths.scss)
    .pipe( sourcemaps.init())
    .pipe( sass())
    .pipe( postcss( [ autoprefixer(), cssnano() ]))
    .pipe( sourcemaps.write('.'))
    .pipe( dest("./build/css"));
}


function javascript(){
    return src(paths.js)
    .pipe( sourcemaps.init())
    .pipe( concat('bundle.js'))
    .pipe( terser())
    .pipe( sourcemaps.write('.'))
    .pipe( rename({suffix: '.min'}))
    .pipe( dest('./build/js'));
}

function imagenes(){
    return src(paths.imagenes)
    .pipe( imagemin())
    .pipe( dest('./build/img'))
    .pipe( notify({ message: 'Imagenes minificadas'}));
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe( webp())
    .pipe( dest('./build/img'))
    .pipe( notify({ message: 'Imagenes webp listas'}));
}

function watchArchivos(){
    //* = la carpeta actual todos los archivos los recorre
    //**/* todos los archviso de la carpeta raiz en este caso scss */
    watch(paths.scss, compilarSASS);
    watch(paths.js, javascript);
}

exports.compilarSASS = compilarSASS;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(compilarSASS, javascript, imagenes, versionWebp, watchArchivos);