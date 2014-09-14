/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller:true, IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//  requires jq-inview
var Scroller = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Scroller',
        self = new G.constructor(name, '(wrap iscroll controller)'),
        myScroll, iscale = 2, total = 7,
        Df;

    Df = { // DEFAULTS
        cfig: {
            momentum: true,
            mouseWheel: !false,
            snap: !true,
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
            this.scrollTo(0, page2pix(num2page(num, 'rev'), this.wrapperHeight), time || 0);
        } else {
            this.goToPage(0, num2page(num, 'rev'), time || 0); //, time, offsetX, offsetY, easing
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
        $('footer p').each(function () {
            activate($(this).find('a').eq(num));
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {
        var foot = $('footer.touch');
        var page = $('.pager');

        myScroll.on('beforeScrollStart', function () {
            C.debug('beforeScrollStart');
        });
        myScroll.on('scrollCancel', function () {
            C.debug('scrollCancel');
        });
        myScroll.on('scrollStart', function () {
            var page = myScroll.getCurrentPage();

            activateNum(page - 1);

            C.debug('scrollStart', 'page', page);
        });
        myScroll.on('scrollEnd', function () {
            var pg = myScroll.getCurrentPage();

            C.debug('scrollEnd', 'page', pg);

            activateNum(pg - 1);

            if (pg == 1) {
                page.removeClass('active');
                foot.addClass('active');
            } else {
                page.addClass('active');
                foot.removeClass('active');
            }
            if (pg > total) {
                myScroll.setCurrentPage(1, 0);
            }
        });

        $('nav.pager, footer p').on('click', 'a', function () {
            var me = $(this), num = me.data('page');

            myScroll.setCurrentPage(num, 400);
        });

        $('img.down').on('click', function () {
            var num = (myScroll.getCurrentPage() | 0) + 1;
            num = (num >= 1) ? num : 1;
            myScroll.setCurrentPage(num, num === 1 ? 0 : 400);
        });

        $('#Page8').on('inview', function (evt, vis, lr, tb) { // visi?, left+right, top+bottom
            if (tb) {
                myScroll.setCurrentPage(1, 0);
                _.delay(function () {
                    myScroll.setCurrentPage(1.1, 400);
                }, 99);
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
