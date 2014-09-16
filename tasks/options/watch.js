module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    options: {
        livereload: false,
    },
    base: {
        files: ['libs/*.js', 'scripts/*.js', 'app/**/*.html', 'scss/**/*.scss'],
        tasks: ['jshint:precat', 'concat:baselib', 'concat:basesrc', 'sass:base'],
    },
    lib: {
        files: ['libs/*.js'],
        tasks: ['jshint', 'concat:lib'],
    },
    src: {
        files: ['scripts/*.js'],
        tasks: ['jshint', 'concat:src'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass'],
    },
    html: {
        files: ['app/**/*.html'],
    },
    config: {
        options: {
            reload: true,
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
