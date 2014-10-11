/*jslint white:false */
/*globals _, C, W, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// POLYFILLS
//
// Object.create
//
if (typeof Object.create !== 'function') { // SHIM _util.poly
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
// Array.indexOf  (IE8)
//
if (!Array.prototype.indexOf) { // SHIM _util.poly
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
// XPath https://code.google.com/p/fbug/source/browse/branches/firebug1.6/content/firebug/lib.js?spec=svn12950&r=8828#1332

/**
 * Gets an XPath for an element which describes its hierarchical location.
 */
W.getElementXPath = function (element) { // SHIM _util.poly
    if (element && element.id) return '//*[@id="' + element.id + '"]';
    else return W.getElementTreeXPath(element);
};

W.getElementTreeXPath = function (element) { // SHIM _util.poly
    var paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for (; element && element.nodeType == 1; element = element.parentNode) {
        var index = 0;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) continue;

            if (sibling.nodeName == element.nodeName) ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (index ? "[" + (index + 1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
