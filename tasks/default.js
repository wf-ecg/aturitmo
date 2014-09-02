module.exports = function(grunt) {

    grunt.registerTask('default', [
        'connect', 'sass',
        'jshint:precat', 'concat', 'jshint:postcat',
        'uglify', 'sync', 'watch',
    ]);

    grunt.registerTask('easy', [
        'connect', 'sass:base', 'watch',
    ]);

    grunt.registerTask('custom', 'Say hello!', function() {
        grunt.log.writeln("Custom task log");
    });

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln('\n\n\n\nWATCH >><< TARGET:', target, filepath);

//        var cfgkey = ['copy', 'files'];
//        grunt.config.set(cfgkey, [grunt.config.get(cfgkey)].map(function(file) {
//            file.src = filepath;
//            return file;
//        }));
    });

};
/*

// You can specify single files:
// Or arrays of files:

    files: { 'dest/file': 'foo/this.js' }
    files: { 'dest/file': ['foo/this.js', 'foo/that.js', 'foo/the-other.js'] }

// Or you can generalize with a glob pattern:
// This single node-glob pattern:
// Could also be written like this:

    files: { 'dest/file': 'foo/th*.js' }
    files: { 'dest/file': 'foo/{a,b}*.js' }
    files: { 'dest/file': ['foo/a*.js', 'foo/b*.js'] }

// All .js files, in foo/, in alpha order:
// Here, bar.js is first, followed by the remaining files, in alpha order:
// All files except for bar.js, in alpha order:
// All files in alpha order, but with bar.js at the end.

    files: { 'dest/file': ['foo/*.js'] }
    files: { 'dest/file': ['foo/bar.js', 'foo/*.js'] }
    files: { 'dest/file': ['foo/*.js', '!foo/bar.js'] }
    files: { 'dest/file': ['foo/*.js', '!foo/bar.js', 'foo/bar.js'] }

// Templates may be used in filepaths or glob patterns:
// But they may also reference file lists defined elsewhere in the config:

    files: { 'dest/<%= basename %>.min.js': ['src/<%= basename %>.js'] }
    files: { 'dest/file': ['foo/*.js', '<%= jshint.all.src %>'] }

 */