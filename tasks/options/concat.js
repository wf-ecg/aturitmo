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
//        tasks: ['sync'],
    },
    base: {
        options: { sourceMap: false, },
        files: {
            'app/build/lib.js': ['libs/*.js'],
            'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_[a-z]*.js'],
        },
    },
    full: {
        options: { sourceMap: true, },
        files: {
            'app/build/lib.js': ['libs/*.js'],
            'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_[a-z]*.js'],
        },
    },
};

