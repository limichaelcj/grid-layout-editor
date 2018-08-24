"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GridLayout = function () {
  function GridLayout() {
    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
    var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    _classCallCheck(this, GridLayout);

    this._rows = rows;
    this._columns = columns;
    this._padding = 2;
    this._gap = 2;
    this._items = [];
  }
  //setters


  _createClass(GridLayout, [{
    key: "assignTo",
    value: function assignTo(node) {
      var style = node.style;
      style.display = "grid";
      style.gridTemplateRows = "repeat(" + this._rows + ", 1fr)";
      style.gridTemplateColumns = "repeat(" + this._columns + ", 1fr)";
      style.padding = this._padding + "px";
      style.gridGap = this._gap + "px";
    }
  }, {
    key: "fill",
    value: function fill(node, color) {
      var children = [].slice.call(node.childNodes);
      children.forEach(function (i) {
        if (i.dataset.type === 'fill') i.remove();
      });
      for (var i = 0; i < this._rows * this._columns; i++) {
        var div = document.createElement('div');
        div.style.backgroundColor = color;
        div.setAttribute('data-type', 'fill');
        node.append(div);
      }
    }

    //inserts a DOM element in the parent node
    //x,y,w,h dimensions are in grid units
    //uses flex grid

  }, {
    key: "insert",
    value: function insert(parent, type, content, x, y, w, h) {
      var wrapper = document.createElement('div');
      //uses flex grid-area
      wrapper.style.gridArea = [y, x, y + h, x + w].join(' / ');
      var elem = document.createElement(type);
      elem.style = Object.assign(elem.style, w > h ? { width: "100%", height: "auto" } : { width: "auto", height: "100%" });
      if (type === 'img') {
        elem.src = content;
      } else {
        elem.innerHTML = content;
      }
      wrapper.append(elem);
      parent.append(wrapper);
    }
  }, {
    key: "rows",
    set: function set(val) {
      this._rows = val;
    },

    //getters
    get: function get() {
      return this._rows;
    }
  }, {
    key: "columns",
    set: function set(val) {
      this._columns = val;
    },
    get: function get() {
      return this._columns;
    }
  }, {
    key: "padding",
    set: function set(val) {
      this._padding = val;
    }
  }, {
    key: "gridGap",
    set: function set(val) {
      this._gap = val;
    },
    get: function get() {
      return this._gap;
    }
  }, {
    key: "style",
    get: function get() {
      return {
        display: "grid",
        gridTemplateRows: "repeat(" + this._rows + ", 1fr)",
        gridTemplateColumns: "repeat(" + this._columns + ", 1fr)",
        padding: this._padding + "px",
        gridGap: this._gap + "px"
      };
    }
  }]);

  return GridLayout;
}();