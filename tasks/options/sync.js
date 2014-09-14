module.exports = {

    // CONNECT
    // https://github.com/tomusdrw/grunt-sync

    main: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/wf-ecg/aturitmo/2/'
        }],
        //pretend: true,
        updateOnly: true, // Don't remove any files from `dest` (works around 30% faster)
        verbose: true,
    },
};
