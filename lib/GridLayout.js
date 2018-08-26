"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GridLayout = function () {
  function GridLayout() {
    var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;

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
    value: function fill(node) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'silver';

      var children = [].slice.call(node.childNodes);
      children.forEach(function (i) {
        if (i.dataset.type === 'fill') i.remove();
      });
      for (var i = 0; i < this._rows * this._columns; i++) {
        var div = document.createElement('div');
        div.style.backgroundColor = color;
        div.setAttribute('data-type', 'fill');
        node.prepend(div);
      }
    }

    //inserts a DOM element in the parent node
    //x,y,w,h dimensions are in grid units
    //uses flex grid

  }, {
    key: "insert",
    value: function insert(parent) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text';
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.items.length.toString();
      var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'null';
      var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var x = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      var h = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var w = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

      var wrapper = document.createElement('div');
      //uses flex grid-area
      wrapper.style.gridArea = [y, x, 'span ' + h, 'span ' + w].join(' / ');
      wrapper.style.cursor = "move";
      wrapper.style.position = "relative";
      wrapper.className = "GridLayout-item";
      wrapper.dataset.name = name;
      var elem = document.createElement(type);
      elem.style.height = "100%";
      if (type === 'img') {
        elem.src = content;
      } else {
        elem.style.width = "100%";
        elem.style.display = "table";
        var text = document.createElement('span');
        text.style.display = "table-cell";
        text.style.verticalAlign = "middle";
        text.innerHTML = content;
        elem.append(text);
      }
      wrapper.append(elem);
      parent.append(wrapper);
      this._items.push(wrapper);
      return elem;
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
    key: "dimensions",
    get: function get() {
      return {
        columns: this._columns,
        rows: this._rows
      };
    }
  }, {
    key: "items",
    get: function get() {
      return this._items;
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
  }, {
    key: "data",
    get: function get() {
      var items = [];
      this._items.forEach(function (i) {
        items.push({
          name: i.dataset.name,
          area: i.style.gridArea,
          src: i.src
        });
      });
      return {
        rows: this._rows,
        columns: this._columns,
        items: items
      };
    }
  }]);

  return GridLayout;
}();