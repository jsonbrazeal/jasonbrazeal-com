import nav from '../css/nav.css'
var exports = module.exports = {};

var mod = function(document) {
    document.getElementById(nav.uno).addEventListener('click', function(e) {
        document.getElementById(nav.p2).classList.remove(nav.pageIn);
        document.getElementById(nav.p3).classList.remove(nav.pageIn);
        document.getElementById(nav.p1).classList.remove(nav.pageFaded);
        document.getElementById(nav.p1).classList.remove(nav.blurry);
        e.preventDefault();
        return false;
    });

    document.getElementById(nav.dos).addEventListener('click', function(e) {
        document.getElementById(nav.p2).classList.add(nav.pageIn);
        document.getElementById(nav.p3).classList.remove(nav.pageIn);
        document.getElementById(nav.p1).classList.add(nav.pageFaded);
        document.getElementById(nav.p1).classList.add(nav.blurry);
        e.preventDefault();
        return false;
    });

    document.getElementById(nav.tres).addEventListener('click', function(e) {
        document.getElementById(nav.p2).classList.remove(nav.pageIn);
        document.getElementById(nav.p3).classList.add(nav.pageIn);
        document.getElementById(nav.p1).classList.add(nav.pageFaded);
        document.getElementById(nav.p1).classList.add(nav.blurry);
        e.preventDefault();
        return false;
    });
    return;
};

module.exports = mod;
