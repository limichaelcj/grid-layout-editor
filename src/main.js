const grid = new GridLayout(20,35);
const tracker = new GridTracker();

document.addEventListener('DOMContentLoaded', ()=>{

  const layout = document.getElementById('layout'); //parent

  document.getElementById('body').onresize = ()=>{
    tracker.track(layout,grid);
  };

  resetGrid(grid,layout,tracker);


});

//batch

function resetGrid(grid,parent,tracker){
  grid.assignTo(parent);
  grid.fill(parent, '#222');
  tracker.track(parent,grid);
  //resync insert drag snap
  let inserts = getInserts(parent);
  inserts.forEach((i)=>{
    //displace fills
    let style = i.style.gridArea.split(' / ');
    let col = getSpan(style[2]);
    let row = getSpan(style[3]);
    let displacement = col * row;
    for(let i = 0; i < displacement; i++){
      parent.firstChild.remove();
    }
    //renew onmousemove drag
    applyDragSnap(i,parent,grid.dimensions, tracker.anchors);
  });
}
