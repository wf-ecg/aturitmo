/* = = = = = = = aturitmo::main::concat::2015-04-16T17:03:53 = = = = = = = */
//
// scripts/modal.js
//
/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Modal:true, Main, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Modal',
        self = new G.constructor(name, '(enable modal selections)'),
        Df, active;

    Df = { // DEFAULTS
        dat: {},
        delay: 333,
        div: '.modal',
        autohide: 'article',
        inits: function () {
            this.delay = Main.delay || this.delay;
            this.div = $(this.div);
            this.autohide = this.div.find(this.autohide);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _show(evt) {
        var me, button;

        me = $(evt.currentTarget);
        button = $('.closer').hide();

        me.fadeIn(Df.delay, function () {
            button.fadeIn(Df.delay);
        });

        Df.autohide.hide();
        active = true;
    }

    function _hide(evt) {
        var me = $(evt.currentTarget);

        me.slideUp(Df.delay);
        active = false;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {
        Df.div.each(function () {
            var me = $(this)
            .on('show.' + name, _show) //
            .on('hide.' + name, _hide) //
            .on('click', function () {
                me.trigger('hide.' + name);
            });

            if (U.debug(1)) {
                C.debug(name, '_binding', '\n', me);
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.isInited(true)) {
            return null;
        }
        Df.inits();
        bindings();
        return self;
    }

    $.extend(self, {
        __: Df,
        init: _init,
        hide: function () {
            Df.div.trigger('hide.' + name);
        },
        show: function () {
            Df.div.trigger('show.' + name);
            return self;
        },
        status: function () {
            return Boolean(active);
        },
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/

/* = = = = = = = = = = */
//
// scripts/scroller.js
//
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

        this._setCurrentPage(num, time);
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _activate(jq) {
        jq.siblings().removeClass('active');
        jq.addClass('active');
    }

    function _activateNum(num) {
        num = num || myScroll.getCurrentPage();
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

        myScroll.setCurrentPage(0.9, 0);
        _.defer(function () {
            myScroll.setCurrentPage(1.1);
        });

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

            if (!W.isIE && !Main.isMobile()) {
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

            num += (num < total) ? 1 : 0.44; // half step into loop
            myScroll.setCurrentPage(num, num === 1 ? 0 : undefined);
        }).css('position', 'fixed');

        $('section').on('inview', function (evt, vis, lr, tb) { ///             evaluate each section
            var id = evt.currentTarget.id;

            if (vis && id === Df.dupe) { // overlap area
                _loopback();
            } else if (tb === 'top' && id) {
                _activateNum(parseInt(id, 10));
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

            if (!W.isIE) { // get fancy
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
        if (self.isInited(true)) {
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

/* = = = = = = = = = = */
//
// scripts/stats.js
//
/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Stats:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Stats = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Stats',
        self = new G.constructor(name, '(update Google Analytics)'),
        Df;

    Df = { // DEFAULTS
        controls: 'a, button, .control, .shiny',
        key: 'HHM',
        lastAction: null,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function dump(msg) {
        if (msg) {
            C.info(name, '(dump)', [Df.key, msg]);
        }
    }

    function send(msg) {
        W.ga('send', 'event', Df.key, msg, {
            'nonInteraction': true
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _update(msg) {
        (W.ga ? send : dump)(msg);
    }

    function getActive() {
        if (W.lastAction !== Df.lastAction) {
            Df.lastAction = W.lastAction;
            _update(Df.lastAction);
        }
    }

    function makeMessage(evt) {
        var me, msg, str, tag, type;

        me = $(evt.currentTarget);
        msg = me.data('stat') || '';
        str = (me.children()[0] || me.get(0)).innerText || me.attr('href');
        tag = me.prop('tagName');
        type = evt.type;

        if (!msg) switch (tag) {
            case 'A':
                msg = ('Link:' + str); break;
            case 'BUTTON':
                msg = ('Button:' + me.get(0).textContent); break;
            default:
                msg = me.parent().get(0).className;
        }
        if (msg) {
            msg = msg + ':' + type;
        }
        return msg;
    }

    function bind() {
        $('body').on('click keypress', Df.controls, function (evt) {
            W.lastAction = makeMessage(evt);
        });
    }

    function _init() {
        bind();
        W.setInterval(getActive, 1500);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _.once(_init),
        update: _.debounce(_update, 1500),
    });

    return self.init();
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

    SYNTAX 1                     // Value     Type     Required   Description
    ga('send', 'event',
        'category',             // Category  String   Yes        Typically the object that was interacted with (e.g. button)
        'action',               // Action    String   Yes        The type of interaction (e.g. click)
            'opt_label',        // Label     String   No         Useful for categorizing events (e.g. nav buttons)
            opt_value,          // Value     Number   No         Values must be non-negative. Useful to pass counts (e.g. 4 times)
        {'nonInteraction': 1}   // EvtCf?    Field    No         Key/Value pairs define specific field names and values accepted by analytics.js
    );

    SYNTAX 2 (send by passing a configuration field)
    ga('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'button',   // Required.
        'eventAction': 'click',      // Required.
        'eventLabel': 'nav buttons',
        'eventValue': 4
    });
    Read the Field Reference document for a complete list of all the fields that can be used in the configuration field object.
    https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference

*/

/* = = = = = = = = = = */
//
// scripts/_main.js
//
/*jslint white:false */
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
        if (self.isInited(true)) {
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


//# sourceMappingURL=main.js.map