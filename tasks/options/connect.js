module.exports = {

    // CONNECT
    // https://github.com/gruntjs/grunt-contrib-connect

    server: {
        options: {
            base: ['app', '.', '../..'],
            //hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
            //open: true,
            livereload: 7999,
            port: 8043,
        },
    },
};
