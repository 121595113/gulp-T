const src = 'src/pc';
const dest = 'build/pc';
const sass = `${src}`;

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
            browser: ["chrome"/*,"google chrome"*/],
            open: 'external' // local, external, ui, ui-external, tunnel or false
        }
    },
    delete: {
        src: [dest]
    },
    html:{
		src:src,
		dest:dest
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
        }
    },
    imagemin: {
        images: {
            src: `${src}/images/**/*`,
            dest: `${dest}/images/`
        },
        ico: {
            src: `${src}/*.{ico,png}`,
            dest: `${dest}/`
        }
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
        html:`${src}/**/*.html`,
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
