'use strict';

var grid = new GridLayout(20, 35);
var tracker = new GridTracker();

document.addEventListener('DOMContentLoaded', function () {

  var layout = document.getElementById('layout'); //parent

  document.getElementById('body').onresize = function () {
    tracker.track(layout, grid);
    var children = [].slice.call(layout.childNodes);
    var inserts = children.filter(function (e) {
      return e.dataset.type !== 'fill';
    });
    console.log(inserts);
    inserts.forEach(function (i) {
      applyDragSnap(i, document.getElementById('layout'), grid.dimensions, tracker.anchors);
    });
  };

  grid.assignTo(layout);
  grid.fill(layout, '#222');
  tracker.track(layout, grid);
});

//batch

function resetGrid(grid, parent, tracker) {
  tracker.track(parent, grid);
}

//handlers

function handleFiles(files) {
  var reader = new FileReader();
  var data;
  reader.onload = function (e) {
    data = e.target.result;
    //returns the img element inside a div with grid layout attributes
    var insert = grid.insert(layout, 'img', data, 5, 5, 4, 2);
    applyDragSnap(insert, document.getElementById('layout'), grid.dimensions, tracker.anchors);
    var resizerUp = createResizer('left', '-20px', 'top', '2px', 'fas fa-angle-up');
    var resizerDown = createResizer('left', '-20px', 'top', '20px', 'fas fa-angle-down');
    insert.parentNode.append(resizerUp);
    insert.parentNode.append(resizerDown);
    resizerUp.onclick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode, 2, -1);
    };
    resizerDown.onclick = function () {
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode, 2, 1);
    };
  };
  reader.readAsDataURL(files[0]);
}
//helpers

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

function resize(target, dir, inc) {
  var prev = target.style.gridArea.split(' / ');
  var span = parseInt(prev[dir].replace(/\D/g, '')) + inc;
  if (span < 2) span = 2;
  var next = prev.slice();
  next[dir] = 'span ' + span;
  target.style.gridArea = next.join(' / ');
}