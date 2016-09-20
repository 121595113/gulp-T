const src = 'app';
const dest = 'dist';
const sass = `${src}/_source`;

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
            open: 'ui' // local, external, ui, ui-external, tunnel or false
        }
    },
    delete: {
        src: [dest]
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
    sass: {
        src: `${src}/_source/sass/**/*.scss`,
        dest: `${dest}/css`,
        options:{
           outputStyle: 'compact'//nested expanded compact compressed
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
        pug:`${src}/_source/pug/**/*.pug`,
        images:`${src}/images/**/*.{jpg,jpeg,png,gif}`,
        scripts: `${src}/js/**/*.js`
    },
    sprites: {
        src: src + '/images',
        dest: {
            css: src + '/_source/sass/sprites/',
            image: src + '/images/'
        }
    }
};
