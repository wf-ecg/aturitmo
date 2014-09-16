module.exports = {

    // CONCAT
    // https://github.com/gruntjs/grunt-contrib-concat

    options: {
        sourceMap: false,
    },
    bootstrap: {
        options: {
            sourceMap: false, // see uglify for map
        },
        dest: 'app/build/boot.js',
        src: [
            'libs/bootstrap/jquery.js',
            'libs/bootstrap/modernizr.js',
            'libs/bootstrap/lodash.underscore.js',
            'libs/bootstrap/console.js',
            'libs/bootstrap/global.js',
        ],
        tasks: ['sync'],
    },
    base: {
        options: { sourceMap: false, },
        'app/build/lib.js': ['libs/*.js'] ,
        'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_main.js'] ,
    },
    full: {
        options: { sourceMap: true, },
        'app/build/lib.js': ['libs/*.js'] ,
        'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_main.js'] ,
    },
};

