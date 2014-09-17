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

        if (!msg) switch(tag) {
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
