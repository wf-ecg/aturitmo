module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    options: {
        livereload: false,
    },
    lib: {
        files: ['libs/*.js'],
        tasks: ['jshint', 'concat:base'],
    },
    src: {
        files: ['scripts/*.js'],
        tasks: ['jshint', 'concat:base'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:base'],
    },
    html: {
        files: ['app/**/*.html'],
    },
    test: {
        options: {
            //reload: true,
        },
        files: ['Gruntfile.js', 'tasks/*.js', 'tasks/options/*.js'],
        tasks: ['default'],
    },
    reloads: {
        options: {
            livereload: 7043,
        },
        files: ['app/**/*'],
        tasks: ['sync'],
    },
};
