/*jslint white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Modal',
        self = new Global(name, '(enable modal selections)'),
        Df;

    Df = { // DEFAULTS
        dat: {},
        delay: null,
        all: '.modal',
        autohide: 'video, article',
        inits: function () {
            this.delay = Main.delay || 333;
            this.all = $(this.all);
            this.autohide = this.all.find(this.autohide);
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
    }

    function _hide(evt) {
        var me = $(evt.target);

        me.slideUp(Df.delay);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// HANDLERS

    function bindings() {
        Df.all.each(function () {
            var me = $(this)
            .on('show.' + name, _show) //
            .on('hide.' + name, _hide) //
            .on('click', function () {
                me.trigger('hide.' + name);
            });

            if (U.debug(1)) {
                C.debug(name + '_binding', '\n', me);
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
            Df.all.trigger('hide.' + name);
        },
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
