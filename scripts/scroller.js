/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller:true, IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Scroller = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Scroller',
        self = new G.constructor(name, '(wrap iscroll controller)'),
        myScroll, iscale = 2, total = 7,
        Df;

    Df = { // DEFAULTS
        cfig: {
            momentum: true,
            mouseWheel: true,
            //snap: true,
            keyBindings: {
                pageUp: 34,
                pageDown: 33,
                up: 40,
                down: 38
            },
            indicators: [{
                el: $('#Pics')[0],
                ignoreBoundaries: true,
                // interactive: true,
                resize: false,
            }],
        },
        obj: null,
        x: {
            eventPassthrough: false,
            momentum: true,
            scrollX: 1,
            scrollY: 0,
            snapSpeed: 999,
        },
        inits: function () {
            this.obj = myScroll = new IScroll('#Text', this.cfig);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only

    function lilround(num) {
        return Math.round(num * 10 | 0) / 10;
    }

    function num2page(num, rev) {
        if (!rev) {
            return (num) / iscale + 1;
        } else {
            return (num - 1) * iscale;
        }
    }

    function page2pix(num, per) {
        return -(num * per);
    }

    function pix2page(num, per) {
        return lilround(-num / per);
    }

    IScroll.prototype.drtObj = function () {
        return {
            obj: this,
            pageTot: this.maxScrollY / -this.wrapperHeight,
            toBottom: this.y - this.maxScrollY,
            page: lilround(-this.y / this.wrapperHeight),
            percent: lilround(this.y / this.maxScrollY * 100),
        };
    };

    IScroll.prototype._getCurrentPage = function () {
        return pix2page(this.y, this.wrapperHeight);
    };

    IScroll.prototype.getCurrentPage = function () {
        if (U.undef(this.currentPage)) {
            return num2page(this._getCurrentPage());
        }
        return num2page(this.currentPage.pageY);
    };

    IScroll.prototype.setCurrentPage = function (num, time) {
        if (U.undef(this.currentPage)) {
            this.scrollTo(0, page2pix(num2page(num, 'rev'), this.wrapperHeight), 400);
        } else {
            this.goToPage(0, num2page(num, 'rev'), time); //, time, offsetX, offsetY, easing
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function activate(jq) {
        jq.parent().children().removeClass('active');
        jq.addClass('active');
    }

    function activateNum(num) {
        activate($('nav.pager a').eq(num));
        activate($('footer p a').eq(num));
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {

        myScroll.on('beforeScrollStart', function () {
            C.debug('beforeScrollStart');
        });
        myScroll.on('scrollCancel', function () {
            C.debug('scrollCancel');
        });
        myScroll.on('scrollStart', function () {
            C.debug('scrollStart', 'page', myScroll.getCurrentPage());
        });
        myScroll.on('scrollEnd', function () {
            var page = myScroll.getCurrentPage();

            C.debug('scrollEnd', 'page', page);

            activateNum(page - 1);

            if (page == 1) {
                $('.pager').removeClass('active');
                $('footer').addClass('active');
            } else {
                $('.pager').addClass('active');
                $('footer').removeClass('active');
            }
            if (page > total) {
                myScroll.setCurrentPage(0.5, 0);
            }
        });

        $('nav.pager, footer p').on('click', 'a', function () {
            var me = $(this), num = me.data('page');

            myScroll.setCurrentPage(num);
            activate(me);
        });

        $('img.down').on('click', function () {
            myScroll.setCurrentPage((myScroll.getCurrentPage() + 1) % (total + 0.5));
        });

        $('#Page8').on('inview', function (evt, vis, lr, tb) { // visi?, left+right, top+bottom
            if (tb === 'top') {
                myScroll.setCurrentPage(0.5, 0);
            }
        });

        if (U.debug(1)) {
            C.debug(myScroll);
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        bindings();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
