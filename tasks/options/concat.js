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
    },
    baselib: {
        files: { 'app/build/lib.js': ['libs/*.js'] },
    },
    basesrc: {
        files: { 'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_main.js'] },
    },
    lib: {
        options: { sourceMap: true, },
        files: { 'app/build/lib.js': ['libs/*.js'] },
    },
    src: {
        options: { sourceMap: true, },
        files: { 'app/build/src.js': ['scripts/[a-z]*.js', 'scripts/_main.js'] },
    },
};

