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
        src: [
            'libs/bootstrap/jquery.js',
            'libs/bootstrap/modernizr.js',
            'libs/bootstrap/lodash.underscore.js',
            'libs/bootstrap/console.js',
            'libs/bootstrap/global.js',
        ],
        dest: 'app/build/boot.js',
    },
    lib: {
        src: [
            'libs/*.js',
        ],
        dest: 'app/build/lib.js',
    },
    src: {
        src: [
            'scripts/[a-z]*.js', 'scripts/_main.js',
        ],
        dest: 'app/build/src.js',
    },
};

