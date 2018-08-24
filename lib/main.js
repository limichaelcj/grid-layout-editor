'use strict';

var grid = new GridLayout(35, 20);
var tracker = new GridTracker();

document.addEventListener('DOMContentLoaded', function () {

  var layout = document.getElementById('layout');

  //setup grid in 'layout'
  grid.assignTo(layout);
  grid.fill(layout, '#222');

  //setup tracker
  tracker.track(layout, grid);

  //html page handlers
});

function handleFiles(files) {
  var reader = new FileReader();
  var data;
  reader.onload = function (e) {
    data = e.target.result;
    grid.insert(layout, 'img', data, 5, 5, 6, 4);
  };
  reader.readAsDataURL(files[0]);
}