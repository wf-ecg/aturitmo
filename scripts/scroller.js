/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, Scroller:true, IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//  requires jq-inview
var Scroller = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Scroller',
        self = new G.constructor(name, '(wrap iscroll controller)'),
        myScroll, iscale = 2, total = 7, foot, pnav, fnav, tip,
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
        C.warn('setCurrentPage', num, time);

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

    function _activate(jq) {
        jq.siblings().removeClass('active');
        jq.addClass('active');
    }

    function _activateNum(num) {
        _activate($('nav.pager a').eq(num - 1));

        fnav.each(function () {
            _activate($(this).find('a').eq(num - 1));
        });
        if (num < 1.01) {
            pnav.removeClass('active');
            foot.addClass('active');
        } else {
            pnav.addClass('active');
            foot.removeClass('active');
        }
    }

    function _loopback() {
        var num = myScroll.getCurrentPage();
        var dif = num - total;

        if (U.debug(1)) {
            C.debug(name, '_loopback', num, dif);
        }

        myScroll.setCurrentPage(1 - dif, 0);

        _.delay(function () {
            myScroll.setCurrentPage(1 + dif);
        }, 99);

        Stats.update('Loopback:Page1:scroll');
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {
        foot = $('footer');
        pnav = $('nav.pager');
        fnav = foot.find('nav');
        tip = $('<span>').addClass('tip');

        //myScroll.on('beforeScrollStart', function () {});
        //myScroll.on('scrollCancel', function () {});
        //myScroll.on('scrollStart', function () {});

        myScroll.on('scrollEnd', function () {
            var num = myScroll.getCurrentPage();

            _activateNum(num);
            if (!Main.isMobile()) {
                self.rest();
            }
        });

        foot.on('mouseover mouseout', 'section.touch', function (evt) { ///     give bottom fnav the "dock" feel
            if (evt.type === 'mouseover') {
                foot.addClass('active');
            } else {
                foot.removeClass('active');
            }
        });

        fnav.add(pnav).on('click', 'a', function () { ///                       set triggers directly to pages
            var me = $(this), num = me.data('page');

            myScroll.setCurrentPage(num);
        });

        $('img.down').on('click', function () { ///                             scroll to next page /or/ jump to top and crawl
            var num = Math.round(myScroll.getCurrentPage()) % (total + 1);

            num += (num < total) ? 1 : 0.5;
            myScroll.setCurrentPage(num, num === 1 ? 0 : undefined);
        }).css('position', 'fixed');

        $('section').on('inview', function (evt, vis, lr, tb) { ///             evaluate each section
            var id = evt.currentTarget.id;

            if (vis && id === Df.dupe) { // overlap area
                _loopback();
            } else if (tb === 'top' && id) {
                Stats.update('Viewing:' + evt.currentTarget.id + ':scroll');
            }
        });

        pnav.find('a').each(function () { // regenerate tool tipping
            var me, txt, eng, esp;

            me = $(this);
            txt = me.attr('title');

            me.attr({ // turn title into tips/alt
                title: '',
                alt: txt,
            });
            txt = txt.split('/');

            if (!W.msie) { // get fancy
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
            var num = Math.round(self.page());

            self.page(num, Df.delay * 6);
            _activateNum(num);
        }, Df.delay * 3, false),
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
