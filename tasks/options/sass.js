module.exports = {

    // SASS
    // https://github.com/gruntjs/grunt-contrib-sass

    base: {
        options: {
            compass: true,
            require: 'animation',
            sourcemap: 'none',
            // {String}(Default: auto)
            //  auto - relative paths where possible, file URIs elsewhere
            //  file - always absolute file URIs
            //  inline - include the source text in the sourcemap
            //  none - no sourcemaps
            style: 'compact',
            //update: true, /// {Boolean}(Default: false) Only compile changed files.
        },
        files: {
            'app/build/screen.css': 'scss/screen.scss',
        },
    },
    maps: {
        options: {
            compass: true,
            require: 'animation',
            style: 'compact',
        },
        files: {
            'app/build/screen.css': 'scss/screen.scss',
        },
    },
};
