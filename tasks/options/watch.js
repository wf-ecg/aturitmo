module.exports = {

    // WATCH
    // https://github.com/gruntjs/grunt-contrib-watch

    options: {
        debounceDelay: 3333,
    },
    cat: {
        files: ['libs/*.js', 'scripts/*.js'],
        tasks: ['jshint:precat', 'concat:base'],
    },
    css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:base'],
    },
    reloads: {
        options: {
            livereload: '<%= pkg.port0 %>',
        },
        files: ['app/**/*', '!app/**/*.map'],
        tasks: ['jshint:postcat', 'sync:base'],
    },
    warn: {
        options: { reload: !false, },
        files: ['Gruntfile.js', 'tasks/**/*'],
        tasks: ['warning'],
    },
};
