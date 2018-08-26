'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GridTracker = function () {
  function GridTracker() {
    _classCallCheck(this, GridTracker);

    this._anchors = []; //top-left points
    this._ends = []; //bottom-right points
  }

  _createClass(GridTracker, [{
    key: 'track',
    value: function track(node, grid) {
      //reset tracker's data
      this._anchors = [];
      this._ends = [];
      //setup variables
      var rows = grid.rows;
      var columns = grid.columns;
      //get fill elements from grid-assigned node
      var children = [].slice.call(node.children);
      var fills = children.filter(function (elem) {
        return elem.dataset.type === 'fill';
      });
      for (var i = 0; i < rows * columns; i++) {
        this._anchors[i] = {
          x: fills[i].offsetLeft,
          y: fills[i].offsetTop
        };
        this._ends[i] = {
          x: fills[i].offsetLeft + fills[i].offsetWidth,
          y: fills[i].offsetTop + fills[i].offsetHeight
        };
      }
    }
  }, {
    key: 'anchors',
    get: function get() {
      return this._anchors;
    }
  }, {
    key: 'ends',
    get: function get() {
      return this._ends;
    }
  }]);

  return GridTracker;
}();