class GridTracker {
  constructor(){
    this._anchors = []; //top-left points
    this._ends = []; //bottom-right points
  }

  get anchors() {
    return this._anchors;
  }
  get ends() {
    return this._ends;
  }

  track(node, grid){
    //reset tracker's data
    this._anchors = [];
    this._ends = [];
    //setup variables
    let rows = grid.rows;
    let columns = grid.columns;
    //get fill elements from grid-assigned node
    let children = [].slice.call(node.children);
    let fills = children.filter((elem)=>{
      return elem.dataset.type === 'fill';
    });
    for(let i = 0; i< rows*columns; i++){
      this._anchors[i] = {
        x: fills[i].offsetLeft,
        y: fills[i].offsetTop
      };
      this._ends[i] = {
        x: fills[i].offsetLeft + fills[i].offsetWidth,
        y: fills[i].offsetTop + fills[i].offsetHeight
      }
    }
  }
}
