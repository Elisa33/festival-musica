//Set-ExecutionPolicy Unrestricted  volverlo a poner en su lugar Set-ExecutionPolicy RemoteSigned
// gulp watchArchivos en la terminal para que lea y compile automaticamente
const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

const paths = {
	imagenes: 'src/img/**/*',
	scss: 'src/scss/**/*.scss',
	js: 'src/js/**/*.js',
};

// funcion que compila sass
function css() {
	return src(paths.scss)
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(dest('./build/css'));
}

function minificarcss() {
	return src(paths.scss)
		.pipe(
			sass({
				outputStyle: 'compressed',
			})
		)
		.pipe(dest('./build/css'));
}

function javascript() {
	return src(paths.js).pipe(concat('bundle.js')).pipe(dest('./build/js'));
}

function imagenes() {
	return src(paths.imagenes)
		.pipe(imagemin())
		.pipe(dest('./build/img'))
		.pipe(notify({ message: 'Imagen Minificada' }));
}

function versionWebp() {
	return src(paths.imagenes)
		.pipe(webp())
		.pipe(dest('./build/img'))
		.pipe(notify({ message: 'Version webp lista' }));
}

function watchArchivos() {
	watch(paths.scss, css);
	watch(paths.js, javascript);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);
