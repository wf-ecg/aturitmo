/*jslint white:false, evil:true */
/*globals _, C, W, Glob, ROOT, Util, jQuery,
        IScroll, Main:true, Modal, Scroller, Stats, jsView, videojs, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, agent, body, html, modal, scroll, shape;

    Df = { // DEFAULTS
        delay: 400,
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

            C.info('Main init @ ' + Date(), {
                aspect: shape,
                debug: W.debug,
                mobile: agent,
            });
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
            top: '-45%',
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
            body.addClass(agent ? 'fillX' : 'fillY');
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
        var H = L.hash.slice(1);

        if (!H) {
            return;
        } else {
            H = (parseInt(H) == H) ? H|0 : H; // coerce to number?

            _.delay(function () {
                L.hash = ''; // rehash soon
            }, Df.delay * 10);
        }

        if (typeof H === 'number') {
            C.warn(H);
            return scroll.setCurrentPage(H);
        } else switch (H) {
            case 'EngLang': return switchLang('en');
            case 'EspLang': return switchLang('es');
            case 'EngDisc': return disclose('.eng.legal');
            case 'EngDown': return disclose('.eng.exit');
            case 'EspDisc': return disclose('.esp.legal');
            case 'EspDown': return disclose('.esp.exit');
            case 'EngVid1': return vidplay('#MobileDeposit_Demo');
            case 'EngVid2': return vidplay('#SurePay_Demo');
            case 'EspVid1': return vidplay('#MobileDeposit_Demo_Spanish');
            case 'EspVid2': return vidplay('#SurePay_Demo_Spanish');
        }
    }

    function bindings() {
        $(':header').widorph();
        $('h3, p').widorph().widorph();

        switchLang(U.debug() ? 'en': 'es');

        $(W).on('hashchange', _hashListen);

        $(W.document).on('touchmove', function (e) {
            e.preventDefault();
            C.debug(name, 'touchmove');
        });

        $(W).on('resize', _.debounce(function () {
            var keepStill = modal.status(); // could be going fullscreen
            var shapeChange = (shape !== jsView.port.orientation());

            if (!keepStill && shapeChange) {
                W.location.reload();
            }
        }, 333, false));

        $('button').on('click', function (evt) {
            var url = $(evt.currentTarget).data('url');

            if (url.charAt(0) === '#') {
                W.location.hash = url.slice(1);
                return;
            }
            W.open(url, 'offsite');
        });

        $('header img.left').on('click', function () {
            scroll.setCurrentPage(1);
            html.removeClass('debug');
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
        Scroller.page(0);
        Stats.init();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        self.serv = W.location.hostname;

        scroll = Scroller.init();
        modal = Modal.init();
        //genGAstrings();
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
        isMobile: function () {
            return !!agent;
        },
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
