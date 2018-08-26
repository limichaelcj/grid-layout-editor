//helpers

function getInserts(parent){
  let children = [].slice.call(parent.childNodes);
  return children.filter((e)=>{
    return e.dataset.type !== 'fill'
  });
}

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

//remove the span text in gridArea property
function getSpan(str){
  return parseInt(str.replace(/\D/g,''));
}
