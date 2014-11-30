/*jslint white:false */
/*globals _, C, W, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// POLYFILLS
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
