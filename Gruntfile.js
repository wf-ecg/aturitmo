module.exports = function(grunt) {
    var conf = {};

    // Load tasks from the tasks folder
    grunt.loadTasks('tasks');

    // Utility to load the different option files based on their names
    function dirlist(path) {
        return require('glob').sync('*', path ? {
            cwd: path,
        } : '');
    }

    function gluejs(path) {
        var obj = {};

        dirlist(path).forEach(function (opt) {
            var key = opt.replace(/\.js$/, '');

            obj[key] = require(path + opt);
        });

        return obj;
    }

    // Start initial config object
    conf.pkg = grunt.file.readJSON('./package.json');

    // Load tasks/options by the name: watch.js => watch{}
    grunt.util._.extend(conf, gluejs('./tasks/options/'));
    grunt.initConfig(conf);

    //console.log('1', grunt.config.get('connect.base.options'));
    console.log('* * * * * * * * Big old grunt load * * * * * * * * *');
    //console.log('2', conf === grunt.config.data, dirlist());

    require('load-grunt-tasks')(grunt);
};
