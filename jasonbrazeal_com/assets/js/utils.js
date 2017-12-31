import graphics from "../css/graphics.css";

var exports = module.exports = {};

var hi = function(document) {
  console.log('hi')
};


var toTitleCase = function(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.querySelector('span').innerHTML = this.txt;

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = 0;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

var typewriter = function(document) {
  var elem = document.getElementsByClassName(graphics.typewriter)[0];
  var toRotate = elem.getAttribute('data-rotate');
  var period = elem.getAttribute('data-period');
  if (toRotate) {
    new TxtRotate(elem, JSON.parse(toRotate), period);
  }
};

module.exports = {
  hi: hi,
  toTitleCase: toTitleCase,
  typewriter: typewriter
};
