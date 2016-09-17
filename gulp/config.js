const src = 'app';
const build = 'dist';
const development = 'dist/development';
const production = 'dist/production';
const srcAssets = 'app/_assets';
const sass = 'app/_source';
const developmentAssets = 'dist';
const productionAssets = 'dist/production/assets';

module.exports = {
    browsersync: {
        development: {
            notify: false,
            port: 9000,
            server: {
                baseDir: [build],
                index: 'index.html',
                routes: {
                    // '/bower_components': 'bower_components'
                }
            },
            browser: ["google chrome", "chrome"],
            open: 'ui' // local, external, ui, ui-external, tunnel or false
        },
        production: {
            server: {
                baseDir: [production]
            },
            port: 9998
        }
    },
    delete: {
        src: [developmentAssets]
    },
    pug:{
		src:['app/_source/pug/**/*.pug', '!app/_source/pug/components/*', '!app/_source/pug/layout/*'],
		dest:'dist',
		data:'app/_source/pug/data/'
    },
    compass: {
        src: 'app/_source/sass/**/*.scss',
        dest: 'dist/css',
        options: {
        	import_path: ['app/_source/_function'],
            sass: 'app/_source/sass',
            css: 'dist/css',
            image: 'dist/images',
            sourcemap: true
        },
        autoprefixer: {
            browsers: [
                'last 2 versions',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ],
            cascade: true
        }
    },
    imagemin: {
        src: 'app/images/**/*',
        dest: 'dist/images/',
        srcico:'app/*.{ico,png}',
        destico:'dist/'
    },
    uglify:{
    	src:'app/js/**/*.js',
    	dest:'dist/js/',
    	options:{}
    },
    watch: {
    	changes:[
	    	'dist/**/*.html',
	    	'dist/images/**/*',
	    	'dist/css/**/*',
	    	'dist/js/**/*'
    	],
        sass: sass + '/sass/**/*.scss',
        pug:'app/_source/pug/**/*.pug',
        images:'app/images/**/*.{jpg,jpeg,png,gif}',
        scripts: 'app/js/**/*.js'
    },
    sprites: {
        src: srcAssets + '/images/sprites/icon/*.png',
        dest: {
            css: srcAssets + '/styles/partials/base/',
            image: srcAssets + '/images/sprites/'
        },
        options: {
            cssName: '_sprites.scss',
            cssFormat: 'css',
            cssOpts: {
                cssClass: function(item) {
                    // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                    if (item.name.indexOf('-hover') !== -1) {
                        return '.icon-' + item.name.replace('-hover', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        return '.icon-' + item.name;
                    }
                }
            },
            imgName: 'icon-sprite.png',
            imgPath: '/assets/images/sprites/icon-sprite.png'
        }
    }
};
