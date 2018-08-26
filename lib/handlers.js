'use strict';

//handlers

function resizeGrid(value, unit) {
  if (unit === 'row') {
    grid.rows = value;
  } else {
    grid.columns = value;
  }
  resetGrid(grid, document.getElementById('layout'), tracker);
}

function addText() {
  var name = prompt("Text ID/name: ", grid.items.length.toString());
  var text = prompt("Please enter text: ", "Text");
  if (text == null) return;
  var layout = document.getElementById('layout');
  var insert = grid.insert(layout, 'div', name, text, 1, 1, 2, 4);
  insert.style.textAlign = "center";
  for (var i = 0; i < 8; i++) {
    layout.firstChild.remove();
  }
  applyDragSnap(insert, layout, grid.dimensions, tracker.anchors);
  var resizerUp = createResizer('left', '-20px', 'top', '2px', 'fas fa-angle-up');
  var resizerDown = createResizer('left', '-20px', 'top', '20px', 'fas fa-angle-down');
  var resizerLeft = createResizer('left', '2px', 'top', '-20px', 'fas fa-angle-left');
  var resizerRight = createResizer('left', '20px', 'top', '-20px', 'fas fa-angle-right');
  insert.parentNode.append(resizerUp);
  insert.parentNode.append(resizerDown);
  insert.parentNode.append(resizerLeft);
  insert.parentNode.append(resizerRight);
  resizerUp.onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode, 'y', -1);
  };
  resizerDown.onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode, 'y', 1);
  };
  resizerLeft.onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode, 'x', -1);
  };
  resizerRight.onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode, 'x', 1);
  };
}

function handleFiles(files) {
  var name = prompt("Image ID/name: ", grid.items.length.toString());
  var reader = new FileReader();
  var data;
  reader.onload = function (e) {
    data = e.target.result;
    var layout = document.getElementById('layout');
    //returns the img element inside a div with grid layout attributes
    var insert = grid.insert(layout, 'img', name, data, 1, 1, 4, 2);
    //remove the fill squares based on the insert's area 4x2=8
    for (var i = 0; i < 8; i++) {
      layout.firstChild.remove();
    }
    applyDragSnap(insert, layout, grid.dimensions, tracker.anchors);
    var resizerUp = createResizer('left', '-20px', 'top', '2px', 'fas fa-angle-up');
    var resizerDown = createResizer('left', '-20px', 'top', '20px', 'fas fa-angle-down');
    insert.parentNode.append(resizerUp);
    insert.parentNode.append(resizerDown);
    resizerUp.onclick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode, 'y', -1, true);
    };
    resizerDown.onclick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode, 'y', 1, true);
    };
  };
  reader.readAsDataURL(files[0]);
}

function resize(target, direction, inc) {
  var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  //link direction to the gridArea span index in the format "col / row / span col / span row"
  //ortho is the opposite axis
  var dir, ortho;
  if (direction === 'y') {
    dir = 2;
    ortho = 3;
  } else {
    dir = 3;
    ortho = 2;
  }
  var prev = target.style.gridArea.split(' / ');
  var span = getSpan(prev[dir]) + inc;
  //set min, else remove fills based on ortho span
  if (span <= 1) {
    if (image) span = 2;else span = 1;
  } else {
    //add or remove fills based on ortho span
    var oSpan = getSpan(prev[ortho]);
    var layout = document.getElementById('layout');
    if (inc < 0) {
      for (var i = 0; i < oSpan; i++) {
        var clone = layout.firstChild.cloneNode();
        layout.prepend(clone);
      }
    } else if (inc > 0) {
      for (var _i = 0; _i < oSpan; _i++) {
        layout.firstChild.remove();
      }
    }
  }
  var next = prev.slice();
  next[dir] = 'span ' + span;
  target.style.gridArea = next.join(' / ');
}

function saveLayout(grid) {
  if (grid.items.length < 1) {
    alert("Project is empty. Add items to save.");
    return;
  }
  var name;
  while (!name || /\W/.test(name)) {
    name = prompt("Save data ID/name (no spaces or special characters): ", "template");
    if (name == null) return;
  }
  var http = new XMLHttpRequest();
  http.open("POST", "/data", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      alert('Data saved to server!');
    }
  };
  console.log('Sending...');
  http.send(JSON.stringify({
    "name": name,
    "data": grid.data
  }));
}