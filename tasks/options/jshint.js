module.exports = {

    // JSHINT
    // https://github.com/gruntjs/grunt-contrib-jshint

    options: {
        force: true,
        '-W015': true,
        //'-W013': true,
        //'-W033': true,
        '-W061': true,
    },
    precat: ['libs/*.js', 'app/*.js', 'scripts/*.js'],
    postcat: ['app/*.js', 'app/build/src.js'],
};
