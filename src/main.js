const grid = new GridLayout(20,35);
const tracker = new GridTracker();

document.addEventListener('DOMContentLoaded', ()=>{

  const layout = document.getElementById('layout'); //parent

  document.getElementById('body').onresize = ()=>{
    tracker.track(layout,grid);
    let children = [].slice.call(layout.childNodes);
    let inserts = children.filter((e)=>e.dataset.type!=='fill');
    console.log(inserts);
    inserts.forEach((i)=>{
      applyDragSnap(i, document.getElementById('layout'), grid.dimensions, tracker.anchors);
    });
  };

  grid.assignTo(layout);
  grid.fill(layout, '#222');
  tracker.track(layout,grid);


});

//batch

function resetGrid(grid,parent,tracker){
  tracker.track(parent,grid);

}

//handlers

function addText(){
  
}

function handleFiles(files){
  let reader = new FileReader();
  var data;
  reader.onload = (e)=>{
    data = e.target.result;
    //returns the img element inside a div with grid layout attributes
    let insert = grid.insert(layout,'img',data, 5,5,4,2);
    applyDragSnap(insert, document.getElementById('layout'), grid.dimensions, tracker.anchors);
    let resizerUp = createResizer('left','-20px','top','2px','fas fa-angle-up');
    let resizerDown = createResizer('left','-20px','top','20px','fas fa-angle-down');
    insert.parentNode.append(resizerUp);
    insert.parentNode.append(resizerDown);
    resizerUp.onclick = (e)=>{
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode,2,-1);
    };
    resizerDown.onclick = ()=>{
      e.stopPropagation();
      e.preventDefault();
      resize(insert.parentNode,2,1);
    };
  }
  reader.readAsDataURL(files[0]);
}
//helpers

function createResizer(x, xval, y, yval, icon){
  let resizer = document.createElement('div');
  resizer.className = 'resizer';
  resizer.style[x] = xval;
  resizer.style[y] = yval;
  let i = document.createElement('i');
  i.className = icon;
  resizer.append(i);
  return resizer;
}

function resize(target, dir, inc){
  let prev = target.style.gridArea.split(' / ');
  var span = parseInt(prev[dir].replace(/\D/g,'')) + inc;
  if (span < 2) span = 2;
  var next = prev.slice();
  next[dir] = 'span '+span;
  target.style.gridArea = next.join(' / ');
}
