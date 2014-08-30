module.exports = function(grunt) {

    grunt.registerTask('default', [
        'connect', 'sass',
        'jshint:precat', 'concat', 'jshint:postcat',
        'uglify', 'watch',
    ]);

    grunt.registerTask('custom', 'Say hello!', function() {
        grunt.log.writeln("Custom task log");
    });

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln('\n\n\n\nWATCH >><< TARGET:', target);
    });
};
