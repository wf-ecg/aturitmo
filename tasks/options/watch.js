module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    options: {
        livereload: false,
    },
    lib: {
        files: ['libs/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    src: {
        files: ['scripts/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:base'],
    },
    html: {
        files: ['app/**/*.html'],
    },
    reloads: {
        options: {
            livereload: 7043,
        },
        files: ['app/**/*'],
        tasks: ['sync'],
    },
    warn: {
        options: { reload: !true, },
        files: ['Gruntfile.js', 'tasks/**/*'],
        //tasks: ['default'],
    },
};
