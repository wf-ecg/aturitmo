/*jslint white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
    W.G = G;
    W.Tests = $.Callbacks();
    W.Load = {};

    _.defaults(G, { /// all stubs terminated
        top: ROOT.dir + '/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    });

    if ($.browser.msie) {
        $(function () {
            $('html').addClass('msie');
            $('body').on('mouseover', '.region, .widget, a, li', function () {
                $(this).addClass('hover');
            }).on('mouseout', '.region, .widget, a, li', function () {
                $(this).removeClass('hover');
            });
        });
        W.debug--;
    }
    if (ROOT.conf.nom === 'wfmedia' || ROOT.conf.nom === 'mfal') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    Load.base = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
            G.lib + 'iscroll/5.0.4/iscroll.js',
        ],
        nope: [
            G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
            'build/lib.js',
        ],
        complete: function () {
            U = Util;
        },
    };

    Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla1',
        yep: [/*
            G.lib + 'fonts/archer.ssm.css',
            G.lib + 'fonts/archer.ssm.itl.css',
        */],
        nope: [/*
            '//cloud.typography.com/6819872/620964/css/fonts.css', // Normal
            '//cloud.typography.com/6819872/633184/css/fonts.css', // ScrnSmrt
        */],
    };

    Load.main = {
        both: [
            'build/src.js',
        ],
        complete: function () {
            ROOT.loaded($);
            evil(W.Main && W.Main.init());
        },
    };

    Load.test = {
        test: W.debug >= 1,
        yep: [
            //G.src + 'tests.js'
        ],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([Load.base, Load.font, Load.main, Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
