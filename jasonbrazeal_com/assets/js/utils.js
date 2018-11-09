import graphics from "../css/graphics.css";
import animations from "../css/animations.css";
import d3 from 'd3';

var exports = module.exports = {};

// based on
// https://stackoverflow.com/questions/2332811/capitalize-words-in-string/7592235#7592235
var toTitleCase = function(str) {
  return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

// based on
// https://codepen.io/gschier/pen/jkivt?q=simple+typing+carousel&limit=all&type=type-pens
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  // end loop when last item is fully typed
  if (this.el.querySelector("span").innerHTML == this.toRotate[this.toRotate.length - 1]) {
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

  this.el.querySelector("span").innerHTML = this.txt;

  var that = this;
  var delta = 300 - Math.random() * 100;

  // if (this.isDeleting) { delta /= 2; }
  delta /= 2;

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = 0;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
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
  var toRotate = elem.getAttribute("data-rotate");
  var period = elem.getAttribute("data-period");
  if (toRotate) {
    elem.classList.add(animations.blinkingOrange);
    setTimeout(() => {
      new TxtRotate(elem, JSON.parse(toRotate), period);
    }, 500);
  }
};

// based on
// https://github.com/phuonghuynh/bubble-chart/
class BubbleChart  {
  constructor() {
    this.defaultViewBoxSize = 600;
    this.defaultInnerRadius = this.defaultViewBoxSize / 3;
    this.defaultOuterRadius = this.defaultViewBoxSize / 2;
    this.defaultRadiusMin = this.defaultViewBoxSize / 10;
    this.container = ".bubbleChart";
    this.viewBoxSize = this.defaultViewBoxSize;
    this.innerRadius = this.defaultInnerRadius;
    this.outerRadius = this.defaultOuterRadius;
    this.radiusMin = this.defaultRadiusMin;
    this.intersectDelta = 0;
    this.transitDuration = 1000;
    this.radiusMax = (this.defaultOuterRadius - this.defaultInnerRadius) / 2;
    this.intersectInc = 0;
    this.supportResponsive = true;
    this.size = 600;
    this.innerRadius = 600 / 3.5;
    this.radiusMin = 50;
    this.data = {
      items: [
        {text: "Django", count: "236"},
        {text: "Javascript", count: "382"},
        {text: "HTML", count: "170"},
        {text: "CSS", count: "123"},
        {text: "Ruby", count: "12"},
        {text: "Flask", count: "170"},
        {text: "Python", count: "382"},
        {text: "Rails", count: "10"},
        {text: "Bash", count: "170"},
        {text: "AWS", count: "150"},
      ],
      eval: (item) => {return item.count;},
      classed: (item) => {return item.text.toLowerCase();}
    };
    this.centralPoint = this.size / 2;
    this.intervalMax = this.size * this.size;
    this.items = this.data.items;
    this.values = [];
    this.items.forEach((item) => {
      this.values.push(this.data.eval(item));
    });
    this.valueMax = Math.max(this.values);
  }

  randomCirclesPositions(delta) {
    var circles = [];
    var interval = 0;
    while (circles.length < this.items.length && ++interval < this.intervalMax) {
      var val = this.values[circles.length];
      var rad = [(val * this.radiusMax) / this.valueMax, this.radiusMin].reduce((x, y) => {
      return ( x > y ? x : y );
      }, 0)
      var dist = this.innerRadius + rad + Math.random() * (this.outerRadius - this.innerRadius - rad * 2);
      var angle = Math.random() * Math.PI * 2;
      var cx = this.centralPoint + dist * Math.cos(angle);
      var cy = this.centralPoint + dist * Math.sin(angle);
      var hit = false;
      circles.forEach((circle, i, arr) => {
        var dx = circle.cx - cx;
        var dy = circle.cy - cy;
        var r = circle.r + rad;
        if (dx * dx + dy * dy < Math.pow(r - delta, 2)) {
          hit = true;
          return false;
        }
      });
      if (!hit) {
        circles.push({cx: cx, cy: cy, r: rad, item: this.items[circles.length]});
      }
    }
    if (circles.length < this.items.length) {
      if (delta === this.radiusMin) {
        throw {
          message: "Not enough space for all bubble. Please change the options.",
          options: this
        };
      }
      return this.randomCirclesPositions(delta + this.intersectInc);
    }
    return circles.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);

  }

  setup() {
    this.svg = d3.select(this.container).append("svg")
      .attr({preserveAspectRatio: "xMidYMid",
             width: this.size,
             height: this.size,
             class: "bubbleChartSvg"})
      .attr("viewBox", (d) => {return ["0 0", this.viewBoxSize, this.viewBoxSize].join(" ");});
    this.circlePositions = this.randomCirclesPositions(this.intersectDelta);
    var node = this.svg.selectAll(".node")
      .data(this.circlePositions)
    .enter().append("g")
      .attr("class", (d) => {return ["node", this.data.classed(d.item)].join(" ");})
    var fnColor = d3.scale.category20();

    node.append("circle")
      .attr({r: (d) => {return d.r;}, cx: (d) => {return d.cx;}, cy: (d) => {return d.cy;}})
      .style("fill", (d) => {
        return this.data.color !== undefined ? this.data.color(d.item) : fnColor(d.item.text);
      })
      .attr("opacity", "0.8");

    node.append("text")
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("dx", (d) => { return d.cx })
      .attr("dy", (d) => { return d.cy + 5 })
      .text((d) => { return d.item.text });
    node.sort((a, b) => {return this.data.eval(b.item) - this.data.eval(a.item);});

    this.transition = {};

    if (this.supportResponsive) {
      window.addEventListener("resize", () => {
        var width = document.getElementsByTagName(this.container).width;
        this.svg.attr("width", width);
        this.svg.attr("height", width);
      });
    }

  }

  moveToCentral(node) {
    this.centralNode = node;
    this.transition.centralNode = node.classed({active: true})
      .transition().duration(this.transitDuration);
    this.transition.centralNode
    .attr('transform', (d, i) => {
      console.log("translate(" + (this.centralPoint - d.cx) + "," + (this.centralPoint - d.cy) + ")")
      return "translate(" + (this.centralPoint - d.cx) + "," + (this.centralPoint - d.cy) + ")";
    })
    .select("circle")
      .attr("r", (d) => {return this.innerRadius;});
  }

  moveToReflection(node, swapped) {
    node.transition()
      .duration(this.transitDuration)
      .delay(function (d, i) {return i * 10;})
      .attr("transform", swapped ? "" : (d, i) => {
        return "translate(" + (2 * (this.centralPoint - d.cx)) + "," + (2 * (this.centralPoint - d.cy)) + ")";
      })
    .select("circle")
      .attr("r", (d) => {return d.r;});
  }

  reset(node) {
    node.classed({active: false});
  }

  registerClickEvent(node) {
    var swapped = false;
    var self = this;
    node.style("cursor", "pointer").on("click", function(d)  {
      self.clickedNode = d3.select(this);
      self.reset(self.centralNode);
      self.moveToCentral(self.clickedNode);
      self.moveToReflection(self.svg.selectAll(".node:not(.active)"), swapped);
      swapped = !swapped;
    });
  }

};

// class Machine {
//   constructor() {
//     this.light_bulb = document.get_e
//   }

//   func(delta) {
//   }
// }

module.exports = {
  toTitleCase: toTitleCase,
  typewriter: typewriter,
  BubbleChart: BubbleChart
};
