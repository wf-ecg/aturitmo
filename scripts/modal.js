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

        me = $(evt.target);
        button = $('.closer').hide();

        me.fadeIn(Df.delay, function () {
            button.fadeIn(Df.delay);
        });

        Df.autohide.hide();
        active = true;
    }

    function _hide(evt) {
        var me = $(evt.target);

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
