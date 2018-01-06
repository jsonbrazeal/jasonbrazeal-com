import graphics from "../css/graphics.css";
import animations from "../css/animations.css";

var exports = module.exports = {};

var toTitleCase = function(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

var TxtRotate = function(el, toRotate, period) {
  console.log('initializing txtrotate')
  console.log(el)
  console.log(toRotate)
  console.log(period)
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
  // end loop when last item is fully typed
  if (this.el.querySelector('span').innerHTML == this.toRotate[this.toRotate.length - 1]) {
    setTimeout(() => {
      this.el.querySelector(`.${graphics.typewriterCaret}`).classList.add(animations.fadeOut);
      this.el.querySelector(`.${graphics.typewriterCaret}`).classList.remove(animations.blinkingOrange);
    }, 1000);
    return;
  }

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    this.el.querySelector(`.${graphics.typewriterCaret}`).classList.remove(animations.blinkingOrange)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    this.el.querySelector(`.${graphics.typewriterCaret}`).classList.add(animations.blinkingOrange)
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
    elem.classList.add(animations.blinkingOrange);
    setTimeout(() => {
      new TxtRotate(elem, JSON.parse(toRotate), period);
    }, 500);
  }
};

module.exports = {
  toTitleCase: toTitleCase,
  typewriter: typewriter
};
