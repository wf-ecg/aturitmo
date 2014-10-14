/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, Scroller:true, IScroll, */
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
                pageUp: 37,
                up: 38,
                pageDown: 39,
                down: 40,
            },
            indicators: [{
                el: $('#Pics')[0],
                ignoreBoundaries: true,
                interactive: true,
                resize: false,
            }],
        },
        delay: 400,
        dupe: 'Page8',
        obj: null,
        x: {
            eventPassthrough: false,
            momentum: true,
            scrollX: 1,
            scrollY: 0,
            snapSpeed: 999,
        },
        inits: function () {
            this.delay = Main.delay || this.delay;
            this.obj = myScroll = new IScroll('#Text', this.cfig);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only

    function lilround(num) { // round to nearest 10th
        return Math.round(num * 10 | 0) / 10;
    }

    function num2page(num, rev) { // normalize fore and back parallax
        if (!rev) {
            return (num) / iscale + 1;
        } else {
            return (num - 1) * iscale;
        }
    }

    function page2pix(num, per) { // get offset in pix
        return -(num * per);
    }

    function pix2page(num, per) { // get page from offset
        return lilround(-num / per);
    }

    IScroll.prototype.drtObj = function () { // inspect values
        return {
            obj: this,
            pageTot: this.maxScrollY / -this.wrapperHeight,
            toBottom: this.y - this.maxScrollY,
            page: lilround(-this.y / this.wrapperHeight),
            percent: lilround(this.y / this.maxScrollY * 100),
        };
    };

    IScroll.prototype._getCurrentPage = function () { // work without "snap"
        return pix2page(this.y, this.wrapperHeight);
    };

    IScroll.prototype.getCurrentPage = function () { // normal for background
        if (U.undef(this.currentPage)) {
            return num2page(this._getCurrentPage());
        }
        return num2page(this.currentPage.pageY);
    };

    IScroll.prototype._setCurrentPage = function (num, time) {
        time = U.undef(time) ? Df.delay : time;

        if (U.undef(this.currentPage)) {
            this.scrollTo(0, page2pix(num2page(num, 'rev'), this.wrapperHeight), time);
        } else {
            this.goToPage(0, num2page(num, 'rev'), time); //, offsetX, offsetY, easing
        }
    };

    IScroll.prototype.setCurrentPage = function (num, time) {
        var that = this;

        if (num > (total + 0.2)) {
            this._setCurrentPage(0.66, 0);
            _.delay(function () {
                that._setCurrentPage(1.0);
            }, 99);
        } else {
            this._setCurrentPage(num, time);
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function activate(jq) {
        jq.siblings().removeClass('active');
        jq.addClass('active');
    }

    function activateNum(num) {
        activate($('nav.pager a').eq(num - 1));

        $('footer nav').each(function () {
            activate($(this).find('a').eq(num - 1));
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {
        var foot = $('footer');
        var page = $('.pager');
        var tip = $('<span>').addClass('tip');

        //myScroll.on('beforeScrollStart', function () { C.debug(name, 'beforeScrollStart'); });

        //myScroll.on('scrollCancel', function () { C.debug(name, 'scrollCancel'); });

        myScroll.on('scrollStart', function () {
            var pg = myScroll.getCurrentPage();

            activateNum(pg);
        });

        myScroll.on('scrollEnd', function () {
            var pg = myScroll.getCurrentPage();

            activateNum(pg);
            if (!Main.isMobile()) {
                self.rest();
            }
            if (pg === 1) {
                page.removeClass('active');
                foot.addClass('active');
            } else {
                page.addClass('active');
                foot.removeClass('active');
            }
            if (pg > total) {
                myScroll.setCurrentPage(0.66, 0);

                _.delay(function () {
                    myScroll.setCurrentPage(1.0);
                }, 99);
            }
        });

        foot.on('mouseover mouseout', 'section.touch', function (evt) { //      give bottom nav the "dock" feel
            if (evt.type === 'mouseover') {
                foot.addClass('active');
            } else {
                foot.removeClass('active');
            }
        });

        $('nav.pager, footer nav').on('click', 'a', function () { //            set triggers directly to pages
            var me = $(this), num = me.data('page');

            myScroll.setCurrentPage(num);
            activateNum(num);
        });

        $('img.down').on('click', function () { //                              scroll to next page /or/ jump to top and crawl
            var num = (myScroll.getCurrentPage() | 0) + 1;

            num = (num > 0) ? num : 1;
            myScroll.setCurrentPage(num, num === 1 ? 0 : undefined);
        }).css('position', 'fixed');

        $('section').on('inview', function (evt, vis, lr, tb) {
            var id = evt.currentTarget.id;

            if (id === Df.dupe) {
                myScroll.setCurrentPage(0.95, 0);

                _.delay(function () {
                    myScroll.setCurrentPage(1.1);
                }, 99);

                Stats.update('Loopback:Page1:scroll');
            } else if (tb === 'top' && id) {
                Stats.update('Viewing:' + evt.currentTarget.id + ':scroll');
            }
        });

        $('nav.pager a').each(function () {
            var me, txt, eng, esp;

            me = $(this);
            txt = me.attr('title');
            me.attr({
                title: '',
                alt: txt,
            });

            txt = txt.split('/');
            if (!W.msie) {
                eng = tip.clone().text(txt[0]).addClass('eng');
                esp = tip.clone().text(txt[1]).addClass('esp');
                me.append(eng, esp);
            }
        });

        if (U.debug(1)) {
            C.debug(name, myScroll);
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        bindings();
        return myScroll;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        page: function (num, time) {
            if (!U.undef(num)) {
                return myScroll.setCurrentPage(num, time);
            } else {
                return myScroll.getCurrentPage();
            }
        },
        rest: _.debounce(function () {
            self.page(Math.round(self.page()), Df.delay * 6);
        }, Df.delay * 3, false),
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
