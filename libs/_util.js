/*jslint white:false */
/*globals _, C, W, ROOT, Global, jQuery,
        Util:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function ($) { /// IIFE
    'use strict';
    var name = 'Util',
        self = new Global(name, '(limited utils)'),
        U;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// CONSTANTS
    U = {
        args: function () {
            return arguments;
        },
        arrg: function (args) {
            return Array.prototype.slice.apply(args);
        },
        debug: function (n) {
            return W.debug >= (n || 1);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], this.arrg(arguments));
        },
        echoing: function (arr) {
            arr = this.arrg(arguments);
            return function () {
                C.warn(arr);
            };
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    };

    /**
     * Randomize array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     */
    U.shuffleArray = function (array) {
        var i, j, temp;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    // usage: log('inside coolFunc', this, arguments);
    // http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
    U.log = function () {
        U.log.history = U.log.history || [];
        U.log.history.push(arguments);
        if (W.console) {
            W.console.log(Array.prototype.slice.call(arguments));
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _fixIE() {
        $('body').on('mouseover', '*', function (evt) {
            evt.stopPropagation();
            $(this).addClass('hover');
        }).on('mouseout', '*', function (evt) {
            evt.stopPropagation();
            $(this).removeClass('hover');
        });
    }

    void(W.isIE && _fixIE());

    $.extend(self, {
        testrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
        fixIE: _fixIE,
    }, U);

    return self;
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
