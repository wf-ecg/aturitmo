/*jslint white:false */
/*globals $, C:true, W:true, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C;

W = (window.W || window);
C = (W.C || W.console);

(function (a) { //  assume we can log -- at least
    var c, d; //  bondo the rest!
    c = 'log xfoo quebug delay clear ';
    c += 'assert count debug dir dirxml error exception group groupCollapsed groupEnd info markTimeline profile profileEnd time timeEnd trace warn';
    for (c = c.split(' '); !! (d = c.shift());) {
        a[d] = a[d] || a.log;
    }
    W.C = W.console = a;
}((function (W) {
    if (!C) {
        C = {
            log: function () {}
        };
    }
    try {
        C.log('console.log');
        return C;
    } catch (e) {
        W.alert('Minimum requirement: IE8 or greater.\n' + e);
    }
}(W))));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
