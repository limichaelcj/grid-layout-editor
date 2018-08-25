class GridLayout {
  constructor(rows=10,columns=15){
    this._rows = rows;
    this._columns = columns;
    this._padding = 2;
    this._gap = 2;
    this._items = [];
  }
  //setters
  set rows(val){
    this._rows = val;
  }
  set columns(val){
    this._columns = val;
  }
  set padding(val) {
    this._padding = val;
  }
  set gridGap(val){
    this._gap = val;
  }
  //getters
  get rows() {
    return this._rows;
  }
  get columns(){
    return this._columns;
  }
  get dimensions(){
    return {
      columns: this._columns,
      rows: this._rows
    }
  }
  get gridGap() {
    return this._gap;
  }

  get style(){
    return {
      display: "grid",
      gridTemplateRows: "repeat("+this._rows+", 1fr)",
      gridTemplateColumns: "repeat("+this._columns+", 1fr)",
      padding: this._padding+"px",
      gridGap: this._gap+"px",
    };
  }

  assignTo(node){
    let style = node.style;
    style.display = "grid";
    style.gridTemplateRows = "repeat("+this._rows+", 1fr)";
    style.gridTemplateColumns = "repeat("+this._columns+", 1fr)";
    style.padding = this._padding+"px";
    style.gridGap = this._gap+"px"
  }

  fill(node, color='silver'){
    let children = [].slice.call(node.childNodes);
    children.forEach((i)=>{
      if (i.dataset.type === 'fill') i.remove();
    });
    for(let i=0; i<(this._rows*this._columns); i++){
      let div = document.createElement('div');
      div.style.backgroundColor = color;
      div.setAttribute('data-type','fill');
      node.prepend(div);
    }
  }

  //inserts a DOM element in the parent node
  //x,y,w,h dimensions are in grid units
  //uses flex grid
  insert(parent,type='text',content='null',y=1,x=1,h=1,w=1){
    let wrapper = document.createElement('div');
    //uses flex grid-area
    wrapper.style.gridArea = [y,x,'span '+h,'span '+w].join(' / ');
    wrapper.style.cursor = "move";
    wrapper.style.position = "relative";
    wrapper.className = "GridLayout-item";
    let elem = document.createElement(type);
    elem.style.height = "100%";
    if (type==='img'){
      elem.src = content;
    } else {
      elem.innerHTML = content;
      elem.style.width = "100%";
    }
    wrapper.append(elem);
    parent.append(wrapper);
    return elem;
  }

}
