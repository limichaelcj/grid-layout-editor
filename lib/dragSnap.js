"use strict";

function applyDragSnap(elem, parent, grid, points) {
  elem.onmousedown = function (e) {
    e = e || window.event;
    e.stopPropagation();
    e.preventDefault();
    //get bounds
    var bounds = parent.getBoundingClientRect();
    //get cursor position
    var cx = e.pageX;
    var cy = e.pageY;
    //get anchor offset
    var ax = cx - elem.parentNode.offsetLeft;
    var ay = cy - elem.parentNode.offsetTop;

    elem.style.boxShadow = "0 0 5px cyan";

    document.onmousemove = dragElement;
    document.onmouseup = closeDrag;

    function dragElement(e) {
      e = e || window.event;
      e.preventDefault();
      //set new cursor position;
      cx = e.pageX;
      cy = e.pageY;
      //snap to grid snap points
      var anchor = {
        x: cx - ax,
        y: cy - ay
      };
      //uses global tracker
      var snap = findClosestPoint2D(anchor, points, grid);
      var prev = elem.parentNode.style.gridArea;
      elem.parentNode.style.gridArea = prev.replace(/^\s*\d+\s*\/\s*\d+/, snap.row + ' / ' + snap.col);
    }
    function closeDrag() {
      document.onmousemove = null;
      document.onmouseup = null;
      elem.style.boxShadow = "";
    }
  };
}

function getDistance(x1, y1, x2, y2) {
  return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function findClosestPoint2D(point, data, grid) {
  var dist = data.map(function (p) {
    return getDistance(point.x, point.y, p.x, p.y);
  });
  var closest = 0;
  for (var i = 1; i < dist.length; i++) {
    if (dist[i] < dist[closest]) closest = i;
  }
  var row = Math.floor(closest / grid.columns) + 1;
  var col = closest % grid.columns + 1;
  return {
    col: col,
    row: row
  };
}