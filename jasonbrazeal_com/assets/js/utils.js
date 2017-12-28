var exports = module.exports = {};

var hi = function(document) {
  console.log('hi')
};


var titleCase = function(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

module.exports = {
  hi: hi,
  titleCase: titleCase
};
