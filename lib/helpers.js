'use strict';

//helpers

function getInserts(parent) {
  var children = [].slice.call(parent.childNodes);
  return children.filter(function (e) {
    return e.dataset.type !== 'fill';
  });
}

function createResizer(x, xval, y, yval, icon) {
  var resizer = document.createElement('div');
  resizer.className = 'resizer';
  resizer.style[x] = xval;
  resizer.style[y] = yval;
  var i = document.createElement('i');
  i.className = icon;
  resizer.append(i);
  return resizer;
}

//remove the span text in gridArea property
function getSpan(str) {
  return parseInt(str.replace(/\D/g, ''));
}