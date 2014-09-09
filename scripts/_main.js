/*jslint white:false, evil:true */
/*globals _, C, W, Glob, ROOT, Util, jQuery,
        IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, body, html;

    Df = { // DEFAULTS
        myScroll: null,
        inits: function () {
            body = $('body');
            html = $('html');

            if (jsView.port.aspect() > 1) {
                body.removeClass('wide').addClass('high');
            } else {
                body.removeClass('high').addClass('wide');
            }

            C.info('Main init @ ' + Date() + ' debug:', W.debug, ROOT.evil);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    // func to contextualize content

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {

        W.document.addEventListener('touchmove', function (e) {
            e.preventDefault();
            C.debug('touchmove');
        }, false);

        $(W).on('resize', function () {
            C.debug('resize', jsView.port.orientation(), jsView.port.aspect());

            _.delay(function () {
                W.location.reload();
            }, 333);
        });

        $('button').on('click', function () {
            W.open('http://www.prizelabs.com/atupasion', 'offsite');
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        self.serv = W.location.hostname;

        _.delay(bindings);
        Df.myScroll = Scroller.init();
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
        mode: eval(U.testrict),
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

    touch ! move
        beforeScrollStart
        scrollCancel

    touch & move
        scrollStart
        scrollEnd


 */
