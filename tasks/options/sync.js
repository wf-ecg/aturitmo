module.exports = {

    // CONNECT
    // https://github.com/tomusdrw/grunt-sync

    base: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/wf-ecg/aturitmo/0/'
        }],
        //pretend: true,
        updateOnly: true, // Don't remove any files from `dest` (works around 30% faster)
        verbose: true,
    },
    full: {
        files: [ {
            cwd: 'app',
            src: ['**/*'],
            dest: '/web/docs/wf-ecg/aturitmo/0/'
        }],
        //pretend: true,
        updateOnly: false, // Don't remove any files from `dest` (works around 30% faster)
        verbose: true,
    },
};
