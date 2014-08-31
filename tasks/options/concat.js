module.exports = {

    // CONCAT
    // https://github.com/gruntjs/grunt-contrib-concat

    options: {
        sourceMap: true,
    },
    bootstrap: {
        options: {
            sourceMap: false,
        },
        dest: 'app/build/boot.js',
        src: [
            'libs/bootstrap/jquery.js',
            'libs/bootstrap/modernizr.js',
            'libs/bootstrap/lodash.underscore.js',
            'libs/bootstrap/console.js',
            'libs/bootstrap/global.js',
        ],
    },
    lib: {
        files: {
            'app/build/lib.js': ['libs/*.js'],
        }
    },
    src: {
        files: {
            'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_main.js'],
        }
    },
};

