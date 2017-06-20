"use strict";

var ListToRender = function ListToRender(props) {
  return React.createElement(
    "div",
    null,
    props.list[1].map(title, function (idx) {
      return React.createElement(Elements, {
        title: title,
        desc: props.list[2][idx],
        weblink: props.list[3][idx]
      });
    })
  );
};

window.ListToRender = ListToRender;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0xpc3RUb1JlbmRlci5qc3giXSwibmFtZXMiOlsiTGlzdFRvUmVuZGVyIiwicHJvcHMiLCJsaXN0IiwibWFwIiwidGl0bGUiLCJpZHgiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZSxTQUFmQSxZQUFlLENBQUNDLEtBQUQ7QUFBQSxTQUNqQjtBQUFBO0FBQUE7QUFDTUEsVUFBTUMsSUFBTixDQUFXLENBQVgsRUFBY0MsR0FBZCxDQUFrQkMsS0FBbEIsRUFBeUI7QUFBQSxhQUN2QixvQkFBQyxRQUFEO0FBQ0UsZUFBT0EsS0FEVDtBQUVFLGNBQU1ILE1BQU1DLElBQU4sQ0FBVyxDQUFYLEVBQWNHLEdBQWQsQ0FGUjtBQUdFLGlCQUFTSixNQUFNQyxJQUFOLENBQVcsQ0FBWCxFQUFjRyxHQUFkO0FBSFgsUUFEdUI7QUFBQSxLQUF6QjtBQUROLEdBRGlCO0FBQUEsQ0FBbkI7O0FBWUFDLE9BQU9OLFlBQVAsR0FBc0JBLFlBQXRCIiwiZmlsZSI6Ikxpc3RUb1JlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBMaXN0VG9SZW5kZXIgPSAocHJvcHMpID0+IChcclxuICA8ZGl2PlxyXG4gICAgICB7IHByb3BzLmxpc3RbMV0ubWFwKHRpdGxlLCBpZHggPT5cclxuICAgICAgICAgIDxFbGVtZW50c1xyXG4gICAgICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgICAgIGRlc2M9e3Byb3BzLmxpc3RbMl1baWR4XX1cclxuICAgICAgICAgICAgd2VibGluaz17cHJvcHMubGlzdFszXVtpZHhdfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgKX1cclxuICA8L2Rpdj5cclxuKVxyXG5cclxud2luZG93Lkxpc3RUb1JlbmRlciA9IExpc3RUb1JlbmRlcjtcclxuIl19