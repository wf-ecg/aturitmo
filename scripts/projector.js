/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Scroller, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Projector = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Projector',
        self = new G.constructor(name, '(carousel projector abstraction)'),
        Df;

    Df = { // DEFAULTS
        all: [],
        current: null,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HELPERS
    //  defaults dependancy only
    Projector.wrap = function () {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function decorate(scroller) {
        if (U.debug(2)) {
            C.debug(name, 'decorate', scroller);
        }
        var projector = {
            port: $(scroller.wrapper),
            scroller: scroller,
            status: 'active',
            timer: null,
            actuate: function () {
                if (Df.current) {
                    Df.current.reset();
                }
                if (this.status === 'active') {
                    this.timer = Scroller.auto(this.scroller);
                } else {
                    W.clearInterval(this.timer);
                }
            },
            changes: function (state) {
                if (this.status !== state) {
                    this.port.removeClass('scrolling ' + this.status);
                    this.status = state;
                    this.port.addClass(this.status);
                    return true;
                } else {
                    return false;
                }
            },
            activate: function () {
                if (this.changes('active')) {
                    this.actuate();
                    this.next();
                    Df.current = this;
                    return true;
                }
                return false;
            },
            reset: function () {
                if (this.changes('paused')) {
                    Df.current = null;
                    this.actuate();
                    return true;
                }
                return false;
            },
            toggle: function () {
                return (this.activate() || this.reset());
            },
            next: function () {
                this.gauge.trigger('advance');
            },
        };

        projector = $.extend(new self.wrap(), projector);
        projector.port.data(name, projector);

        projector.control = projector.port.find('.control');
        projector.gauge = projector.control.parent();
        projector.actuate();

        Df.all.push(projector);

        return projector;
    }

    function _attach(selector) {
        self.init();
        if (U.debug(2)) {
            C.debug(name, '_attach selector', selector);
        }
        var projector, scroller;

        scroller = Scroller.attach(selector);
        projector = decorate(scroller);

        $(selector + ' .control').on('click toggle', function (evt) {
            evt.stopPropagation();
            projector.toggle();
        });
        return projector;
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
        attach: _attach,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
