module.exports = {

    // CONCAT
    // https://github.com/gruntjs/grunt-contrib-concat

    options: {
        banner: ';\n'
        + '/* = = = = = = = '
        + '<%= pkg.name %> '
        + '<%= grunt.task.current.name %> '
        + '= = = = = = = = */\n',
        separator: ';\n'
        + '/* = = = = = = = '
        + '<%= grunt.task.current.target %> '
        + '<%= grunt.template.today("isoDateTime") %> '
        + '= = = = = = = = */\n',
        sourceMap: true,
    },
    boot: {
        options: {
            sourceMap: false, // see uglify for map
        },
        files: {
            'app/build/boot.js': ['libs/boot/*.js'],
        },
    },
    libs: {
        options: {
            sourceMap: false, // see uglify for map
        },
        files: {
            'app/build/libs.js': ['libs/**/*.js','!libs/boot/**'],
        },
    },
    main: {
        options: { sourceMap: true, },
        files: {
            'app/build/main.js': ['scripts/[a-z]*.js', 'scripts/_[a-z]*.js'],
        },
    },
};

