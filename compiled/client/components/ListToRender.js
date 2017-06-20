"use strict";

var ListToRender = function ListToRender(props) {
  return React.createElement(
    "div",
    null,
    props.list[1].map(function (title, idx) {
      return React.createElement(Elements, {
        title: title,
        desc: props.list[2][idx],
        weblink: props.list[3][idx]
      });
    })
  );
};

window.ListToRender = ListToRender;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0xpc3RUb1JlbmRlci5qc3giXSwibmFtZXMiOlsiTGlzdFRvUmVuZGVyIiwicHJvcHMiLCJsaXN0IiwibWFwIiwidGl0bGUiLCJpZHgiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZSxTQUFmQSxZQUFlLENBQUNDLEtBQUQ7QUFBQSxTQUNqQjtBQUFBO0FBQUE7QUFDR0EsVUFBTUMsSUFBTixDQUFXLENBQVgsRUFBY0MsR0FBZCxDQUFtQixVQUFDQyxLQUFELEVBQVFDLEdBQVI7QUFBQSxhQUNsQixvQkFBQyxRQUFEO0FBQ0UsZUFBT0QsS0FEVDtBQUVFLGNBQU1ILE1BQU1DLElBQU4sQ0FBVyxDQUFYLEVBQWNHLEdBQWQsQ0FGUjtBQUdFLGlCQUFTSixNQUFNQyxJQUFOLENBQVcsQ0FBWCxFQUFjRyxHQUFkO0FBSFgsUUFEa0I7QUFBQSxLQUFuQjtBQURILEdBRGlCO0FBQUEsQ0FBbkI7O0FBWUFDLE9BQU9OLFlBQVAsR0FBc0JBLFlBQXRCIiwiZmlsZSI6Ikxpc3RUb1JlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBMaXN0VG9SZW5kZXIgPSAocHJvcHMpID0+IChcclxuICA8ZGl2PlxyXG4gICAge3Byb3BzLmxpc3RbMV0ubWFwKCAodGl0bGUsIGlkeCkgPT5cclxuICAgICAgPEVsZW1lbnRzXHJcbiAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgIGRlc2M9e3Byb3BzLmxpc3RbMl1baWR4XX1cclxuICAgICAgICB3ZWJsaW5rPXtwcm9wcy5saXN0WzNdW2lkeF19XHJcbiAgICAgIC8+XHJcbiAgICApfVxyXG4gIDwvZGl2PlxyXG4pXHJcblxyXG53aW5kb3cuTGlzdFRvUmVuZGVyID0gTGlzdFRvUmVuZGVyO1xyXG4iXX0=