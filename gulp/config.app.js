const src = 'src/app';
const dest = 'build/app';
const sass = `${src}`;

module.exports = {
    browsersync: {
        development: {
            notify: false,
            port: 8000,
            server: {
                baseDir: [dest],
                index: 'index.html',
                routes: {
                    // '/bower_components': 'bower_components'
                }
            },
            browser: [/*"chrome",*/"google chrome"],
            open: 'external' // local, external, ui, ui-external, tunnel or false
        }
    },
    delete: {
        src: [dest]
    },
    pug:{
		src:[`${src}/pug/**/*.pug`, `!${src}/pug/components/*`, `!${src}/pug/layout/*`],
		dest:dest,
		data:`${src}/pug/data/`
    },
    sass: {
        src: `${src}/sass/**/*.scss`,
        dest: `${dest}/css`,
        options:{
            outputStyle: 'expanded'//nested expanded compact compressed
        },
        autoprefixer: {
            browsers: [
                '> 1% in CN',
                'last 10 versions',
                'Firefox ESR',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ]
        },
        base64:{
            baseDir: `${dest}/css`,
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8 * 1024
        }
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
        pug:`${src}/pug/**/*.pug`,
        images:`${src}/images/**/*.{jpg,jpeg,png,gif}`,
        scripts: `${src}/js/**/*.js`
    },
    sprites: {
        src: src + '/images',
        dest: {
            css: src + '/sass/sprites/',
            image: src + '/images/'
        }
    }
};
