/*jslint white:false */
/*globals _, C, W, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// POLYFILLS
//
// Object.create
//
if (typeof Object.create !== 'function') {
    (function () {
        var F = function () {};
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw Error('Second argument not supported');
            }
            if (o === null) {
                o = {}; //throw Error('Cannot set a null [[Prototype]]');
            }
            if (typeof o !== 'object') {
                throw TypeError('Argument must be an object');
            }
            F.prototype = o;
            return new F();
        };
    }());
}
//
// Indexof IE8 polyfill
//
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len, from;

        len = this.length >>> 0;
        from = Number(arguments[1]) || 0;

        from = (from < 0) ? Math.ceil(from) : Math.floor(from);

        if (from < 0) {
            from += len;
        }
        for (; from < len; from++) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }
        return -1;
    };
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
