module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

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
        tasks: ['sync:base'],
    },
    warn: {
        options: { reload: !false, },
        files: ['Gruntfile.js', 'tasks/**/*'],
    },
};
