/*jslint white:false, evil:true */
/*globals _, C, W, Glob, ROOT, Util, jQuery,
        IScroll, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, body, html;

    Df = { // DEFAULTS
        projector: null,
        inits: function () {
            body = $('body');
            html = $('html');
            C.info(jsView.port.aspect());
            if (jsView.port.aspect() > 1) {
                body.removeClass('wide').addClass('high');
            } else {
                body.removeClass('high').addClass('wide');
            }

            C.info('Main init @ ' + Date() + ' debug:', W.debug, ROOT.evil);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)
    // func to contextualize content

    function bindProjector() {

        if (U.debug()) {
            Df.projector.toggle();
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function bindings() {
        var myScroll, iscale = 2, total = 7;

        function num2page(num, rev) {
            if (!rev) {
                return (num) / iscale + 1;
            } else {
                return (num - 1) * iscale;
            }
        }

        function activate(jq) {
            jq.parent().children().removeClass('active');
            jq.addClass('active');
        }

        function activateNum(num) {
            activate($('nav.pager a').eq(num));
            activate($('footer p a').eq(num));
        }

        function getCurrentPage() {
            return num2page(myScroll.currentPage.pageY);
        }

        function setCurrentPage(num, time) {
            myScroll.goToPage(0, num2page(num, 'rev'), time); //, time, offsetX, offsetY, easing
        }

        myScroll = new IScroll('#Text', {
            mouseWheel: true,
            snap: true,
            keyBindings: {
                pageUp: 34,
                pageDown: 33,
                up: 40,
                down: 38
            },
            indicators: [{
                el: $('#Pics')[0],
                ignoreBoundaries: true,
                resize: false,
            }],
        });

        myScroll.on('beforeScrollStart', function () {
            C.debug('beforeScrollStart');
        });
        myScroll.on('scrollCancel', function () {
            C.debug('scrollCancel');
        });
        myScroll.on('scrollStart', function () {
            C.debug('scrollStart', 'page', getCurrentPage());
        });
        myScroll.on('scrollEnd', function () {
            var page = getCurrentPage();
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
                setCurrentPage(0.5, 0);
            }
        });

        W.document.addEventListener('touchmove', function (e) {
            e.preventDefault();
            C.debug('touchmove');
        }, false);

        $('nav.pager, footer p').on('click', 'a', function () {
            var me = $(this), num = me.data('page');

            setCurrentPage(num);
            activate(me);
        });

        $('img.down').on('click', function () {
            setCurrentPage((getCurrentPage() + 1) % (total + 0.5));
        });

        $('button').on('click', function () {
            W.open('http://www.prizelabs.com/atupasion', 'offsite');
        });

        $(W).on('resize', function () {
            C.debug('resize', jsView.port.orientation(), jsView.port.aspect());

            _.delay(function () {
                W.location.reload();
            }, 333);
        });

        $('#Page8').on('inview', function (evt, vis, lr, tb) { // visi?, left+right, top+bottom
            if (tb === 'top') {
                setCurrentPage(0.5, 0);
            }
        });

        if (U.debug(1)) {
            C.debug(myScroll);
        }
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
