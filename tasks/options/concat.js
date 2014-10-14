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
        files: {
            'app/build/boot.js': [
                'libs/bootstrap/jquery.js',
                'libs/bootstrap/modernizr.js',
                'libs/bootstrap/lodash.underscore.js',
                'libs/bootstrap/console.js',
                'libs/bootstrap/global.js',
                'libs/bootstrap/*.js',
            ],
        },
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

