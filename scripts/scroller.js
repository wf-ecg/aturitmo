/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller:true, IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Scroller = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Scroller',
        self = new G.constructor(name, '(wrap iscroll controller)'),
        Df;

    Df = { // DEFAULTS
        all: [],
        speed: 7777,
        /* auto advance */
        iscroll: {
            indicators: [{
                el: null,
                /* later */
                resize: false,
                interactive: true,
            }],
            keyBindings: false,
            eventPassthrough: false,
            momentum: true,
            scrollX: 1,
            scrollY: 0,
            snap: true,
            snapSpeed: 999,
        },
        current: null,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only
    Scroller.wrap = function () {};

    function scrollNext(scroller) {
        if (U.debug(2)) {
            C.debug(name, 'scrollNext', scroller);
        }
        var ln, pg;

        ln = scroller.pages.length;
        pg = (1 + scroller.currentPage.pageX) % ln;
        scroller._execEvent('scrollStart'); // polyfill event
        _.delay(function () {
            scroller.goToPage(pg, 0);
        }, Df.iscroll.snapSpeed / 3);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _autoScroll(scroller) {
        if (U.debug(2)) {
            C.debug(name, '_autoScroll', scroller);
        }
        if (!scroller.pages) {
            return;
        }
        return W.setInterval(function () {
            scrollNext(scroller);
        }, Df.speed);
    }

    function _attachPort(sel) {
        var port, proxy, scroller;

        self.init(); // bueller?
        port = $(sel);

        if (U.debug(2)) {
            C.debug(name, '_attachPort', sel);
        }
        if (!port.length) {
            return {};
        }
        proxy = port.find('.iS-proxy');

        proxy.on('click', function (evt) {
            var aprox = ({
                pg: null,
                w: proxy.outerWidth(),
                x: evt.offsetX,
                y: evt.offsetY,
                ln: scroller.pages.length,
                et: $(evt.target),
                ev: evt,
                calc: function () {
                    this.pg = (this.x / this.w * this.ln) | 0;
                    return this;
                },
            }).calc();

            if (U.debug(2)) {
                C.debug(name, '_attachPort proxy calc', evt.type, aprox);
            }
            scroller._execEvent('scrollStart'); // polyfill event
            scroller.goToPage(aprox.pg, 0);
        });

        proxy.on('advance.' + name, function () {
            scrollNext(scroller);
        });

        Df.iscroll.indicators[0].el = proxy.get(0);
        scroller = new IScroll(port.get(0), Df.iscroll); //github.com/cubiq/iscroll
        scroller.on('scrollStart', function () {
            port.addClass('scrolling');
        });
        scroller.on('scrollEnd', function () {
            port.removeClass('scrolling');
        });

        // store IScroll (internally and as data on wrapper)
        Df.all.push(scroller);
        port.data(name, scroller);
        return scroller;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        attach: _attachPort,
        auto: _autoScroll,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
