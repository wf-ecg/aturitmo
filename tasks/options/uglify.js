module.exports = {

    // UGLIFY
    // https://github.com/gruntjs/grunt-contrib-uglify

    options: {
        // beautify: true,
        compress: {
            unused: false,
        },
        mangle: false,
    },
    base: {
        options: {
            sourceMap: false,
        },
        files: {
            'app/build/boot.min.js': ['app/build/boot.js'],
        }
    },
    full: {
        options: {
            sourceMap: true,
        },
        files: {
            'app/build/boot.min.js': ['app/build/boot.js'],
        //    'app/build/lib.min.js': ['app/build/lib.js'],
        //    'app/build/src.min.js': ['app/build/src.js'],
        }
    },
};
