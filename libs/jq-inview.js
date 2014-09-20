/*jslint white:false */
/*globals jQuery, document, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (W, $) {
    var C = W.console,
        D = W.document,
        DE = D.documentElement,
        debug = 0,
        time = 22,
        name = 'inview',
        inviewObjects = {},
        expando = $.expando,
        vportSize, vportOffs;

    $.event.special.inview = {
        add: function (data) {
            inviewObjects[data.guid + "-" + this[expando]] = {
                data: data,
                $ele: $(this)
            };
        },
        remove: function (data) {
            try {
                delete inviewObjects[data.guid + "-" + this[expando]];
            } catch (e) {}
        }
    };

    function getPortSize() {
        void (W.debug > 1 && C.debug('getPortSize'));

        var mode, domObject, size;

        size = {
            height: W.innerHeight,
            width: W.innerWidth
        };

        // if this is correct then return it. iPad has compat Mode, so will
        // go into check clientHeight/clientWidth (which has the wrong value).
        if (!size.height) {
            mode = D.compatMode;
            if (mode || !$.support.boxModel) { // IE, Gecko
                domObject = mode === 'CSS1Compat' ? DE : // Standards
                D.body; // Quirks
                size = {
                    height: domObject.clientHeight,
                    width: domObject.clientWidth
                };
            }
        }
        return size;
    }

    function getPortOffset() {
        void (W.debug > 1 && C.debug('getPortOffset'));
        return {
            top: W.pageYOffset || DE.scrollTop || D.body.scrollTop,
            left: W.pageXOffset || DE.scrollLeft || D.body.scrollLeft
        };
    }

    //    (function () {
    //        var Dust, _dirty = true,
    //            _delay = 333;
    //
    //        Dust = function (time) {
    //            if (time === - 1) {
    //                _dirty = false;
    //
    //            } else if (time !== null) {
    //                time = (time || _delay);
    //
    //                W.setTimeout(function () {
    //                    _dirty = true;
    //
    //                    C.warn('dust in', time);
    //                }, time);
    //            }
    //        };
    //
    //        Dust.valueOf = function () {
    //            return _dirty;
    //        };
    //
    //        W.dust = Dust;
    //    }());

    function checkInView() {
        //        if (!W.dust) {
        //            C.warn('no dust');
        //            return;
        //        }
        var $eles = $(),
            elesLn, i = 0;

        $.each(inviewObjects, function (i, inviewObject) {
            var sel, $ele;

            sel = inviewObject.data.sel;
            $ele = inviewObject.$ele;
            $eles = $eles.add(sel ? $ele.find(sel) : $ele);
        });

        elesLn = $eles.length;

        if (elesLn) {
            vportSize = vportSize || getPortSize();
            vportOffs = vportOffs || getPortOffset();

            for (; i < elesLn; i++) {
                // Ignore elements that are not in the DOM tree
                if (!$.contains(DE, $eles[i])) {
                    continue;
                }

                var $ele, eleSize, elesOffs, inView, visiPartX, visiPartY, visiPartsMerged;

                $ele = $($eles[i]);
                eleSize = {
                    height: $ele.height(),
                    width: $ele.width()
                };
                elesOffs = $ele.offset();
                inView = $ele.data(name);
                /*
    sometimes vportOffs & vportSize are suddenly null in FF5
    seems this function is interferred by the onresize/onscroll event
    where vportOffs and vportSize are unset
                */
                if (!vportOffs || !vportSize) {
                    return;
                }
                var eO = elesOffs,
                    vO = vportOffs,
                    eS = eleSize,
                    vS = vportSize,
                    vPX = visiPartX,
                    vPY = visiPartY,
                    vPM = visiPartsMerged;

                if (eO.top + eS.height > vO.top && //
                eO.top < vO.top + vS.height && //
                eO.left + eS.width > vO.left && //
                eO.left < vO.left + vS.width) {
                    vPX = (vO.left > eO.left ? 'right' : (vO.left + vS.width) < (eO.left + eS.width) ? 'left' : 'both');
                    vPY = (vO.top > eO.top ? 'bottom' : (vO.top + vS.height) < (eO.top + eS.height) ? 'top' : 'both');
                    vPM = vPX + "-" + vPY;

                    if (!inView || inView !== vPM) {
                        $ele.data(name, vPM).trigger(name, [true, vPX, vPY]);
                    }
                } else if (inView) {
                    $ele.data(name, false).trigger(name, [false]);
                }
            }
        }
        //        W.dust(-1);
    }

    $(W).bind("scroll", function () {
        vportOffs = null;
    }).bind("resize", function () {
        vportSize = null;
    });

    // IE < 9 scrolls to focused elements without firing the "scroll" event
    if (!DE.addEventListener && DE.attachEvent) {
        DE.attachEvent("onfocusin", function () {
            vportOffs = null;
        });
    }
    /*
    Use setInterval in order to also make sure this
    captures elements within "overflow:scroll" elements
    or elements that appeared in the dom tree due to dom manipulation and reflow
    old: $(window).scroll(checkInView);

    BTW, iOS seems to not execute or delays intervals while the user scrolls.
    Therefore the inview event might fire a bit late there
    */
    W.setInterval(checkInView, time);

    $(function () {
        C.warn(name, 'kickstart jquery');
        $(W).scroll();
    });

}(window, jQuery));

// BIND on('inview') directly to element
// HANDLER( {jq}, "is in view?", "x sides", "y sides")
