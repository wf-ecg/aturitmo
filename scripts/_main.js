/*jslint white:false, evil:true */
/*globals _, C, W, Glob, ROOT, Util, jQuery,
        IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, body, html, shape, agent;

    Df = { // DEFAULTS
        scroll: null,
        inits: function () {
            shape = jsView.port.orientation();
            agent = jsView.mobile.agent();
            body = $('body');
            html = $('html');

            if (agent) {
                html.addClass('mini');
                jsView.mobile.addBug();
            }
            if (shape === 'landscape') {
                body.removeClass().addClass('fillY');
            } else if (shape === 'square') {
                body.removeClass().addClass('fillX');
            } else if (shape === 'portrait') {
                body.removeClass().addClass('slim');
            }
            C.info('Main init @ ' + Date() + ' debug:', W.debug, ROOT.evil, shape, agent);
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

        $(W).on('resize', _.debounce(function () {
            W.location.reload();
        }, 333, false));

        $('button').on('click', function (evt) {
            var me = $(evt.target);

            W.open(me.data('url'), 'offsite');
        });

        $('article.esp, article.eng').on('click', function (evt) {
            if (html.is('.esp')) {
                html.removeClass('esp').addClass('eng');
            } else {
                html.removeClass('eng').addClass('esp');
            }
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
        Df.scroll = Scroller.init();
        Df.modal = Modal.init();
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
