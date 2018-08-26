'use strict';

var grid = new GridLayout(20, 35);
var tracker = new GridTracker();

document.addEventListener('DOMContentLoaded', function () {

  var layout = document.getElementById('layout'); //parent

  document.getElementById('body').onresize = function () {
    tracker.track(layout, grid);
  };

  resetGrid(grid, layout, tracker);
});

//batch

function resetGrid(grid, parent, tracker) {
  grid.assignTo(parent);
  grid.fill(parent, '#222');
  tracker.track(parent, grid);
  //resync insert drag snap
  var inserts = getInserts(parent);
  inserts.forEach(function (i) {
    //displace fills
    var style = i.style.gridArea.split(' / ');
    var col = getSpan(style[2]);
    var row = getSpan(style[3]);
    var displacement = col * row;
    for (var _i = 0; _i < displacement; _i++) {
      parent.firstChild.remove();
    }
    //renew onmousemove drag
    applyDragSnap(i, parent, grid.dimensions, tracker.anchors);
  });
}