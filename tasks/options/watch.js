module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    options: {
        livereload: false,
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
        tasks: ['sass:base'],
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
            livereload: 7999,
        },
        files: ['app/**/*'],
    },
};
