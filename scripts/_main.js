/*jslint white:false, evil:true */
/*globals _, C, W, Glob, ROOT, Util, jQuery,
        IScroll, Main:true, */
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

    function duper() {
        var a, b;

        a = $('#Page1');
        b = $('#Page8');

        a = a.find('article').clone().css({
            top: '-33%',
        });
        b.empty().append(a);
    }

    function disclose(sel) {
        $('.modal').trigger('show');
        $('#Legal ' + sel).show().fitContents();
    }

    function vidplay(sel) {
        $('.modal').trigger('show');
        $('#Video ' + sel).show().click(function (evt) {
            evt.stopPropagation();
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function _hashListen(evt) {
        var L = W.location;
        var H = L.hash;

        switch (H) {
            case '#EngLang':
                html.removeClass('esp').addClass('eng');
                break;
            case '#EngDisc':
                disclose('.eng.legal');
                break;
            case '#EngDown':
                disclose('.eng.exit');
                break;
            case '#EspLang':
                html.removeClass('eng').addClass('esp');
                break;
            case '#EspDisc':
                disclose('.esp.legal');
                break;
            case '#EspDown':
                disclose('.esp.exit');
                break;
            case '#EngVid1':
                vidplay('#MobileDeposit_Demo');
                break;
            case '#EngVid2':
                vidplay('#SurePay_Demo');
                break;
            case '#EspVid1':
                vidplay('#MobileDeposit_Demo_Spanish');
                break;
            case '#EspVid2':
                vidplay('#SurePay_Demo_Spanish');
                break;
        }
        _.delay(function () {
            L.hash = '';
        }, 3333);
    }

    function bindings() {
        $(W).on('hashchange', _hashListen);

        W.document.addEventListener('touchmove', function (e) {
            e.preventDefault();
            C.debug('touchmove');
        }, false);

        $(W).on('resize', _.debounce(function () {
            W.location.reload();
        }, 333, false));

        $('button').on('click', function (evt) {
            var url = $(evt.target).data('url');

            if (url.charAt(0) === '#') {
                W.location.hash = url.slice(1);
                return;
            }
            W.open(url, 'offsite');
        });

        duper();
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
