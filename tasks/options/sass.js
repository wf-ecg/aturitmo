module.exports = {

    // SASS
    // https://github.com/gruntjs/grunt-contrib-sass

    options: {
        compass: true,
        require: 'animation',
        style: 'compact',
    },
    base: {
        options: {
            // sourcemap: {String}(Default: auto)
            //  auto - relative paths where possible, file URIs elsewhere
            //  file - always absolute file URIs
            //  inline - include the source text in the sourcemap
            //  none - no sourcemaps
        },
        files: {
            'app/build/screen.css': 'scss/screen.scss',
        },
    },
    full: {
        options: {
            update: !false, /// {Boolean}(Default: false) Only compile changed files.
        },
        files: {
            'app/build/screen.css': 'scss/screen.scss',
        },
    },
    dyna: {
        options: {
            sourcemap: 'none',
        },
        files: [{
            cwd: 'scss/',
            dest: 'app/styles/',
            expand: true,
            ext: '.css',
            extDot: 'last',
            src: ['*.scss'],
        }],
    },
};
