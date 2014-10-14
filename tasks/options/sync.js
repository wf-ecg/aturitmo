module.exports = {

    // CONNECT
    // https://github.com/tomusdrw/grunt-sync

    base: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/<%= pkg.group %>/',
        }],
        //pretend: true,
        updateOnly: true, // Don't remove any files from `dest` (works around 30% faster)
    },
    full: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/<%= pkg.group %>/',
        }],
        //pretend: true,
        updateOnly: false, // Don't remove any files from `dest` (works around 30% faster)
        verbose: true,
    },
};
