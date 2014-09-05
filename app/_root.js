/*jslint white:false, evil: true */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = window,
C = W.console;
W.debug = Number(new Date('2014/08/29') > new Date());
W.ROOT = ({
    evil: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
    base: 0,
    // adjust built-in page depth? (e.g. '-1' == '..')
    conf: {
        'www.wellsfargomedia.com': {
            nom: 'wfmedia',
            sub: '/aturitmo',
        },
        '10.89.101.100': {
            nom: 'qla2',
            sub: '/wf-ecg/aturitmo',
        },
        'localhost:8000': {
            nom: 'localhost',
            sub: '/wf-ecg/aturitmo/app',
        },
        '127.0.0.1:8043': {
            nom: 'localhost',
            sub: '',
        },
    },
    dir: null,
    doc: null,
    lib: null,
    rev: null,
    _host: function (R) { // determine config for this server
        R.conf = R.conf[R.L.host]; // overwrite host hash
        R.conf.top = '//' + R.L.host;
        delete R._host;
    },
    _tops: function (R) { // lookup main directories
        R.doc = R.L.pathname.toString().replace(R.conf.sub, '');
        // capture versioning number directory segment
        R.rev = R.doc.match(/^(\/\d\w*)(.*)$/) || '';
        if (R.rev) {
            R.doc = R.rev[2]; // isolate file name
            R.rev = R.rev[1]; // isolate version integer
        }
        R.lib = R.conf.lib || '/lib';
        R.dir = R.conf.sub + R.rev;
        delete R._tops;
    },
    _down: function (R) { // levels relative to host.sub
        R.deep = R.doc.slice(1).split('/'); //  segment
        R.deep.pop(); //                        trim docname
        R.comp = R.deep.slice(0, R.base); //    hoist to top of subproject
        if (R.base && (R.deep.length + R.base) !== 0) {
            evil(R.comp.length && R.comp.push('')); //slash
            R.base = R.L.protocol + R.conf.top + R.dir + '/' + R.comp.join('/');
        } else {
            delete R.base;
        }
        delete R._down;
    },
    _wrap: function (R) { // write out bootstrap element
        evil(R.base && R.D.write('<base href="' + R.base + '">'));
        R.D.write('<script src="' + R.dir + '/build/boot.min.js"></script>');
        delete R._wrap;
    },
    loaded: function ($) {
        $('body').removeClass('loading');
        if (W.debug > 0) {
            $('html').addClass('dev');
        }
        if (C && C.groupCollapsed) {
            C.groupEnd();
        }
    },
    init: function () {
        'use strict';
        var R = this;
        R.evil = eval(R.evil);
        W.evil = function () {
            return R.evil;
        };
        R.D = W.document;
        R.L = W.location;
        R._host(this);
        R._tops(this);
        R._down(this);
        R._wrap(this);
        delete R.init;
        if (C && C.groupCollapsed) {
            C.groupCollapsed('ROOT', R);
        }
        return R;
    },
}.init());

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
