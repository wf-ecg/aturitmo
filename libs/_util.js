/*jslint white:false */
/*globals _, C, W, ROOT, Global, jQuery,
        Util:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function ($) { /// IIFE
    'use strict';
    var name = 'Util',
        self = new Global(name, '(limited utils)'),
        U;
    var urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
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
    /// JQUERY
    // <reify> take array of selector strings and replace each with page query
    $.reify = function (selarr) {
        $.each(selarr, function (i, e) {
            selarr[i] = $(e);
        });
    };
    // <parseUrl> like Location for hrefs... superparse
    $.parseUrl = function (str) {
        var parseUrl = function ( url ) { // from jquery.mobile.1.4.2
            if ( $.type( url ) === "object" ) {
                return url;
            }
            var matches = urlParseRE.exec( url || "" ) || [];
            return {
                href:         matches[  0 ] || "",
                hrefNoHash:   matches[  1 ] || "",
                hrefNoSearch: matches[  2 ] || "",
                domain:       matches[  3 ] || "",
                protocol:     matches[  4 ] || "",
                doubleSlash:  matches[  5 ] || "",
                authority:    matches[  6 ] || "",
                username:     matches[  8 ] || "",
                password:     matches[  9 ] || "",
                host:         matches[ 10 ] || "",
                hostname:     matches[ 11 ] || "",
                port:         matches[ 12 ] || "",
                pathname:     matches[ 13 ] || "",
                directory:    matches[ 14 ] || "",
                filename:     matches[ 15 ] || "",
                search:       matches[ 16 ] || "",
                hash:         matches[ 17 ] || ""
            };
        }
        var url = parseUrl(str);

        url.hashstring = url.hash.slice(1);
        url.hashbang = /^!/.exec(url.hashstring) && url.hashstring.slice(1);
        url.params = (function () {
            var ret = {},
            seg = url.search.replace(/^\?/, '').split('&'),
            len = seg.length,
            i, s;
            for (i = 0; i < len; i++) {
                if (!seg[i]) continue;
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        }());

        return url;
    };
    // <toString> shorthand logging of element identity
    $.fn.toString = function () {
        var out = [];

        this.each(function () {
            var tag, nom, eid, ecn;

            tag = (this.tagName || '???');
            nom = (this.name ? ('"' + this.name + '"') : 0);
            eid = (this.id ? ('#' + this.id) : 0);
            ecn = (this.className ? ('.' + this.className) : 0);
            nom = (nom || eid || ecn || '(anon)');

            out.push('<' + tag + nom + '>');
        });
        return ('jq:[' + (out.join(', ') || '(empty)') + ']');
    };
    // <filterAll> find items at root query level and below
    $.fn.filterAll = function (sel) {
        return this.filter(sel).add(this.find(sel));
    };
    // <scrolls> roughly find how much scrolling can happen
    $.fn.scrolls = function () {
        var me = this.first();
        return {
            horz: me.scrollLeft(1e6).scrollLeft(),
            vert: me.scrollTop(1e6).scrollTop(),
        };
    };
    // <fitContents> fit content by enlarging and report if enlarged
    $.fn.fitContents = function () {
        var me = this.first();
        var sc = me.scrolls();
        var act = Boolean(sc.horz || sc.vert);

        if (act) {
            me.width(me.width() + sc.horz + 1);
            me.height(me.height() + sc.vert + 1);
        }
        return act;
    };
    // <scrollInfo> find out all about the scroll situation
    $.fn.scrollInfo = function (dirty) {
        var me = this.first();

        var l0 = me.scrollLeft();
        var l1 = me.scrollLeft(1);
        var ln = dirty ? (l0 || l1): me.scrollLeft(1e6).scrollLeft();

        var t0 = me.scrollTop();
        var t1 = me.scrollTop(1);
        var tn = dirty ? (t0 || t1): me.scrollTop(1e6).scrollTop();

        if (!dirty) {
            me.scrollLeft(l0);
            me.scrollTop(t0);
        }
        return {
            x: l0,
            y: t0,
            xMax: dirty ? NaN : ln,
            yMax: dirty ? NaN : tn,
            carefully: !dirty,
            horz: Boolean(ln),
            vert: Boolean(tn),
        };
    };
    // <widorph> glue last 2 words
    $.fn.widorph = function () {
        return this.each(function () {
            var me = $(this);
            me.html(me.html().replace(/\s+(\S+)\s*$/, '&nbsp;$1'));
        });
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
