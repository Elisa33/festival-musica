//Set-ExecutionPolicy Unrestricted  volverlo a poner en su lugar Set-ExecutionPolicy RemoteSigned
// gulp watchArchivos en la terminal para que lea y compile automaticamente
const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const paths = {
	imagenes: 'src/img/**/*',
	scss: 'src/scss/**/*.scss',
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
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, imagenes, versionWebp, watchArchivos);
