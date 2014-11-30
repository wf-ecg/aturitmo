/*jslint white:false */
/*globals _, C, W, Util */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// POLYFILLS
//
// RequestAnimationFrame
//
Util.rafo = function (fnObj) {
    fnObj = fnObj || {};

    var rAF = 'equestAnimationFrame',
        name = 'Util.rafo',
        again, timer, runs = 1,
        U = this,
        noop = function () {};

    rAF = (W['r' + rAF] || W['mozR' + rAF] || W['webkitR' + rAF] || noop);

    function cb(nom) {
        if (fnObj[nom]) {
            fnObj[nom]();
        }
    }

    again = function () {
        if (timer === 'paused') {
            return;
        } else {
            W.clearTimeout(timer);
        }

        timer = W.setTimeout(function () {
            if (U.debug(1)) {
                C.debug(timer, name);
            }
            timer = 'paused';

            rAF(function () {
                if (U.debug(1)) {
                    C.debug(runs, 'running');
                }
                runs += 1;
                timer = !rAF(again);

                cb('play');
            });
            cb('pause');
        }, 1e3);
        cb('always');

        rAF(again);
    };
    rAF(again); // kickoff
};
Util.rafo();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
