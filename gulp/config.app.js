const src = 'app';
const dest = 'dist';
const development = 'dist/development';
const production = 'dist/production';
// const srcAssets = 'app/_assets';
const sass = `${src}/_source`;
const developmentAssets = 'dist';
// const productionAssets = 'dist/production/assets';

module.exports = {
    browsersync: {
        development: {
            notify: false,
            port: 9000,
            server: {
                baseDir: [dest],
                index: 'index.html',
                routes: {
                    // '/bower_components': 'bower_components'
                }
            },
            browser: "chrome",
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
		src:[`${src}/_source/pug/**/*.pug`, `!${src}/_source/pug/components/*`, `!${src}/_source/pug/layout/*`],
		dest:dest,
		data:`${src}/_source/pug/data/`
    },
    compass: {
        development:{
            src: `${src}/_source/sass/**/*.scss`,
            dest: `${dest}/css`,
            options: {
                import_path: [`${src}/_source/_function`],
                sass: `${src}/_source/sass`,
                css: `${dest}/css`,
                image: `${dest}/images`,
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
        production:{},
    },
    imagemin: {
        src: `${src}/images/**/*`,
        dest: `${dest}/images/`,
        srcico:`${src}/*.{ico,png}`,
        destico:`${dest}/`
    },
    uglify:{
    	src:`${src}/js/**/*.js`,
    	dest:`${dest}/js/`
    },
    watch: {
    	changes:[
	    	`${dest}/**/*.html`,
	    	`${dest}/images/**/*`,
	    	`${dest}/css/**/*.css`,
	    	`${dest}/js/**/*`
    	],
        sass: `${sass}/sass/**/*.scss`,
        pug:`${src}/_source/pug/**/*.pug`,
        images:`${src}/images/**/*.{jpg,jpeg,png,gif}`,
        scripts: `${src}/js/**/*.js`
    },
    // sprites: {
    //     src: srcAssets + '/images/sprites/icon/*.png',
    //     dest: {
    //         css: srcAssets + '/styles/partials/base/',
    //         image: srcAssets + '/images/sprites/'
    //     },
    //     options: {
    //         cssName: '_sprites.scss',
    //         cssFormat: 'css',
    //         cssOpts: {
    //             cssClass: function(item) {
    //                 // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
    //                 if (item.name.indexOf('-hover') !== -1) {
    //                     return '.icon-' + item.name.replace('-hover', ':hover');
    //                     // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
    //                 } else {
    //                     return '.icon-' + item.name;
    //                 }
    //             }
    //         },
    //         imgName: 'icon-sprite.png',
    //         imgPath: '/assets/images/sprites/icon-sprite.png'
    //     }
    // }
};
