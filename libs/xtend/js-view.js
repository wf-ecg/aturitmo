/*jslint white:false */
/*globals window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var jsView = (function (W, $) { // IIFE
    var C = W.console,
        name = 'jsView',
        self = {};

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    self.port = {
        ie: ('v' === '\v'), // !!window.ActiveXObject
        _d: W.document,
        _e: W.document.documentElement,
        _s: W.screen,
        _w: W,
        _r: W.devicePixelRatio, // resolution "pixels per pixel" factor
        aspect: function () {
            return this.visualWidth() / this.visualHeight();
        },
        layoutWidth: function () {
            return this._s.width;
        },
        layoutHeight: function () {
            return this._s.height;
        },
        visualWidth: function () {
            return this.ie ? this._e.offsetWidth : this._w.innerWidth;
        },
        visualHeight: function () {
            return this.ie ? this._e.offsetHeight : this._w.innerHeight;
        },
        orientation: function () {
            var diff = this.aspect();

            if (diff > 0.9 && diff < 1.1) {
                return 'square';
            }
            if (diff < 0.5) {
                return 'thin';
            }
            if (diff > 1.666) {
                return 'wide';
            }
            return diff > 1 ? 'landscape' : 'portrait';
        },
        scrollbarWidth: function () {
            return this._w.outerWidth - this._w.innerWidth;
        },
        _widths: function () {
            return {
                s: [ 'width/' + this._s.width,
                    'availW/' + this._s.availWidth] + String(),
                w: ['innerW/' + this._w.innerWidth,
                    'outerW/' + this._w.outerWidth] + String(),
                e: ['offsetW/' + this._e.offsetWidth,
                    'clientW/' + this._e.clientWidth,
                    'scrollW/' + this._e.scrollWidth] + String(),
            };
        },
    };

    self.mobile = {
        bugged: false,
        addBug: function () {
            $('<cite class="bug">M</cite>').css({
                backgroundColor: 'rgba(0,0,0,0.5)',
                bottom: '-2px',
                color: 'white',
                position: 'fixed',
                right: 0,
                zIndex: '9999',
            }).appendTo('body');

            this.bugged = true;
        },
        agent: function () {
            var vis = self.port.visualWidth(),
                mob = (/mobi|android/i).test(W.navigator.userAgent);

            if (!this.bugged && //
                (vis < 973 && vis % 10 === 3) && // webdev responsive layouts add 13px
                (/chrome/i).test(W.navigator.userAgent)) {
                mob = true;
            }
            if (mob) {
                mob = W.navigator.platform;
            }
            return mob;
        },
        zoomed: function () {
            return self.port.layoutWidth() / self.port.visualWidth();
        },
    };

    void(_debug() && C.log([name]));

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
