var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	/*uglify       = require('gulp-uglifyjs'),*/ // Подключаем gulp-uglifyjs (для сжатия JS)
	/*cssnano      = require('gulp-cssnano'),*/ // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	plumber = require('gulp-plumber'), // Чтоб при ошибке не падал сервер
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
	spritesmith = require('gulp.spritesmith'); //Для автосборки спрайта
	sourcemaps = require('gulp-sourcemaps'); //Что б в режиме разработчика показывало норм стили

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/scss/**/*.scss') // Берем источник
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass				
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true })) // Создаем префиксы
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});





gulp.task('browser-sync', function(done) { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
	done()
});

gulp.task('sprite', function (done) {
  var sprite= gulp.src('app/img/icons/*.png').pipe(spritesmith({
    imgName: '../img/sprite.png',
    cssName: '_sprite.scss',
    cssFormat: 'scss',
    algoritm: 'binary-tree',
    padding: 5
  }));
  sprite.img.pipe(rename('sprite.png')).pipe(gulp.dest('app/img/'));
  sprite.css.pipe(gulp.dest('app/scss/utils/'));
  done()
});
/* если нужно обединить все скрипты в один розкоментировать и в шаблоне подключить один файл*/
/*gulp.task('scripts', function() {
	return gulp.src([*/
		/*'app/js/jquery-3.0.0.min.js',
		'app/js/jquery-migrate-1.4.1.min.js',
		'app/js/components/jquery.fancybox.js',
		'app/js/components/jquery.formstyler.js',
		'app/js/components/jquery.mCustomScrollbar.js',
		'app/js/components/slick.js'*///тут нужно подключать библиотеки
		/*])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});*/


gulp.task('watch', gulp.series('browser-sync', 'sprite', function(done) {
	gulp.watch('app/scss/**/*.scss', gulp.series('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch(['app/img/icons/**/*.png'], gulp.series('sprite'));


	// gulp.watch('app/*.html', gulp.series(function (done) {
		// console.log('fuck off')
		// done()
	// })); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/*.html', gulp.series(reload));   // Наблюдение за JS файлами в папке js
	gulp.watch('app/js/**/*.js', gulp.series(reload));   // Наблюдение за JS файлами в папке js
	// gulp.watch('app/js/**/*.js', function() {
		// console.log('fuck off js file')
	// });  // Наблюдение за JS файлами в папке js
	done()
}));

gulp.task('clean', function(done) {
	del.sync('dist'); // Удаляем папку dist перед сборкой
	done()
});

gulp.task('img', function(done) {
	gulp.src('app/img/**/*') // Берем все изображения из app
	// 	.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
	// 		interlaced: true,
	// 		progressive: true,
	// 		svgoPlugins: [{removeViewBox: false}],
	// 		use: [pngquant()]
	// 	})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
	done()
});

gulp.task('build', gulp.series('clean', 'img', 'sass', function(done) {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/style.css'
		])
	.pipe(gulp.dest('dist/css'))

	// var buildFonts = gulp.src('app/scss/**/*') // Переносим scss в продакшен
	// .pipe(gulp.dest('dist/scss'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
	
	done()
}));

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', gulp.series('watch'));


function reload(done) {
	browserSync.reload();
	done();
  }

