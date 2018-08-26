//handlers

function resizeGrid(value,unit){
  if (unit === 'row'){
    grid.rows = value;
  } else {
    grid.columns = value;
  }
  resetGrid(grid,document.getElementById('layout'),tracker);
}

function addText(){
  let name = prompt("Text ID/name: ",grid.items.length.toString());
  let text = prompt("Please enter text: ", "Text");
  if (text == null) return;
  let layout = document.getElementById('layout');
  let insert = grid.insert(layout,'div',name,text,1,1,2,4);
  insert.style.textAlign = "center";
  for (let i = 0; i < 8; i++){
    layout.firstChild.remove();
  }
  applyDragSnap(insert,layout,grid.dimensions,tracker.anchors);
  let resizerUp = createResizer('left','-20px','top','2px','fas fa-angle-up');
  let resizerDown = createResizer('left','-20px','top','20px','fas fa-angle-down');
  let resizerLeft = createResizer('left','2px','top','-20px','fas fa-angle-left');
  let resizerRight = createResizer('left','20px','top','-20px','fas fa-angle-right');
  insert.parentNode.append(resizerUp);
  insert.parentNode.append(resizerDown);
  insert.parentNode.append(resizerLeft);
  insert.parentNode.append(resizerRight);
  resizerUp.onclick = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode,'y',-1);
  };
  resizerDown.onclick = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode,'y',1);
  };
  resizerLeft.onclick = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode,'x',-1);
  };
  resizerRight.onclick = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    resize(insert.parentNode,'x',1);
  };
}

function handleFiles(files){
  var name = prompt("Image ID/name: ", grid.items.length.toString());
  let reader = new FileReader();
  var data;
  reader.onload = (e)=>{
    data = e.target.result;
    let layout = document.getElementById('layout');
    //returns the img element inside a div with grid layout attributes
    let insert = grid.insert(layout,'img',name,data, 1,1,4,2);
    //remove the fill squares based on the insert's area 4x2=8
    for(let i = 0; i < 8; i++){
      layout.firstChild.remove();
    }
    applyDragSnap(insert, layout, grid.dimensions, tracker.anchors);
    let resizerUp = createResizer('left','-20px','top','2px','fas fa-angle-up');
    let resizerDown = createResizer('left','-20px','top','20px','fas fa-angle-down');
    insert.parentNode.append(resizerUp);
    insert.parentNode.append(resizerDown);
    resizerUp.onclick = (e)=>{
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode,'y',-1, true);
    };
    resizerDown.onclick = (e)=>{
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode,'y',1, true);
    };
  }
  reader.readAsDataURL(files[0]);
}

function resize(target, direction, inc, image=false){
  //link direction to the gridArea span index in the format "col / row / span col / span row"
  //ortho is the opposite axis
  var dir,ortho;
  if (direction === 'y'){
    dir = 2;
    ortho = 3;
  } else {
    dir = 3;
    ortho = 2;
  }
  let prev = target.style.gridArea.split(' / ');
  var span = getSpan(prev[dir]) + inc;
  //set min, else remove fills based on ortho span
  if (span <= 1) {
    if (image) span = 2;
    else span = 1;
  }
  else {
    //add or remove fills based on ortho span
    let oSpan = getSpan(prev[ortho]);
    let layout = document.getElementById('layout');
    if (inc < 0) {
      for(let i = 0; i < oSpan; i++){
        let clone = layout.firstChild.cloneNode();
        layout.prepend(clone);
      }
    } else if (inc > 0) {
      for(let i = 0; i < oSpan; i++){
        layout.firstChild.remove();
      }
    }
  }
  var next = prev.slice();
  next[dir] = 'span '+span;
  target.style.gridArea = next.join(' / ');
}

function saveLayout(grid){
  if (grid.items.length < 1) {
    alert("Project is empty. Add items to save.");
    return;
  }
  var name;
  while (!name || /\W/.test(name)){
    name = prompt("Save data ID/name (no spaces or special characters): ", "template");
    if (name == null) return;
  }
  var http = new XMLHttpRequest();
  http.open("POST","/data", true);
  http.setRequestHeader("Content-Type","application/json");
  http.onreadystatechange = ()=>{
    if (http.readyState === 4 && http.status === 200){
      alert(`Data saved to server!`);
    }
  };
  console.log('Sending...');
  http.send(JSON.stringify({
    "name": name,
    "data": grid.data
  }));
}
