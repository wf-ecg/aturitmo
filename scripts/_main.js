/*jslint white:false, evil:true */
/*globals _, C, W, Glob, ROOT, Util, jQuery,
        IScroll, Main:true, Modal, Scroller, jsView, videojs, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, body, html, shape, agent;

    Df = { // DEFAULTS
        delay: 400,
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
            shapeReset();
            C.groupEnd(); // compensate for ROOT.loaded delay

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

    function shapeReset() {
        body.removeClass('fillX fillY slim');

        if (_.contains(['landscape', 'wide'], shape)) {
            body.addClass('fillY');
        } else if (shape === 'square') {
            body.addClass('fillX');
        } else if (_.contains(['portrait', 'thin'], shape)) {
            body.addClass('slim');
        }
    }

    function vidplay(sel) {
//        $('.modal').trigger('show');
//        $(sel).show().click(function (evt) {
//            evt.stopPropagation();
//        });
    }
    function switchLang(lang) {
        var lang1 = 'eng', lang2 = 'esp';

        if (lang === 'en') {
            lang1 = 'esp';
            lang2 = 'eng';
        }
        html.attr('lang', lang);
        html.removeClass(lang1).addClass(lang2);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function _hashListen(evt) {
        var L = W.location;
        var H = L.hash;

        switch (H) {
            case '#EngLang':
                switchLang('en');
                break;
            case '#EngDisc':
                disclose('.eng.legal');
                break;
            case '#EngDown':
                disclose('.eng.exit');
                break;
            case '#EspLang':
                switchLang('es');
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
        }, Df.delay * 10);
    }

    function bindings() {
        switchLang('es');

        $(W).on('hashchange', _hashListen);

        $(W.document).on('touchmove', function (e) {
            e.preventDefault();
            C.debug('touchmove');
        });

        $(W).on('resize', _.debounce(function () {
            var keepStill = Df.modal.status(); // could be going fullscreen
            var shapeChange = (shape !== jsView.port.orientation());

            if (!keepStill && shapeChange) {
                W.location.reload();
            }
        }, 333, false));

        $('button').on('click', function (evt) {
            var url = $(evt.target).data('url');

            if (url.charAt(0) === '#') {
                W.location.hash = url.slice(1);
                return;
            }
            W.open(url, 'offsite');
        });

        $('header img.left').on('click', function () {
            Df.scroll.setCurrentPage(1);
        });

        $('a.vid').on('click', function (evt) {
            evt.preventDefault();

            var vid, vidjs, vidiv;
            vid = $(evt.currentTarget).data('vid');
            vidjs = videojs(vid);
            vidiv = $('#' + vid);

            $('#Video').children().hide();

            vidiv.show().click(function (evt) {
                evt.stopPropagation();
            });

            $('.modal').trigger('show.Modal') //
            .on('hide.Modal', function () {
                vidjs.pause();
                vidiv.hide();
            });

            vidjs.currentTime(0).play();
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

        Df.scroll = Scroller.init();
        Df.modal = Modal.init();
        _.delay(bindings);
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
        delay: Df.delay, // expose for other inits
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
