module.exports = {

    // CONNECT
    // https://github.com/gruntjs/grunt-contrib-connect

    base: {
        options: {
            base: ['app', '.', '../..'],
            open: false,
            livereload: 7043,
            port: 8043,
        },
    },
    full: {
        options: {
            base: ['app', '.', '../..'],
            //hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
            open: true,
            livereload: 7043,
            port: 8043,
        },
    },
};
