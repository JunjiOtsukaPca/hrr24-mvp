"use strict";

var Elements = function Elements(_ref) {
  var title = _ref.title,
      desc = _ref.desc,
      weblink = _ref.weblink;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      title
    ),
    React.createElement(
      "a",
      { href: weblink },
      desc
    )
  );
};
// {title.map( (title, idx)  =>
//   console.log(title, desc[idx], weblink[idx])
// )}
// {console.log(title, desc, weblink)}

window.Elements = Elements;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0VsZW1lbnRzLmpzeCJdLCJuYW1lcyI6WyJFbGVtZW50cyIsInRpdGxlIiwiZGVzYyIsIndlYmxpbmsiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsTUFBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsTUFBU0MsSUFBVCxRQUFTQSxJQUFUO0FBQUEsTUFBZUMsT0FBZixRQUFlQSxPQUFmO0FBQUEsU0FDYjtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBTUY7QUFBTixLQURGO0FBRUU7QUFBQTtBQUFBLFFBQUcsTUFBTUUsT0FBVDtBQUFtQkQ7QUFBbkI7QUFGRixHQURhO0FBQUEsQ0FBZjtBQU1JO0FBQ0E7QUFDQTtBQUNBOztBQUVKRSxPQUFPSixRQUFQLEdBQWtCQSxRQUFsQiIsImZpbGUiOiJFbGVtZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBFbGVtZW50cyA9ICh7dGl0bGUsIGRlc2MsIHdlYmxpbmt9KSA9PiAoXHJcbiAgPGRpdj5cclxuICAgIDxkaXY+e3RpdGxlfTwvZGl2PlxyXG4gICAgPGEgaHJlZj17d2VibGlua30+e2Rlc2N9PC9hPlxyXG4gIDwvZGl2PlxyXG4pXHJcbiAgICAvLyB7dGl0bGUubWFwKCAodGl0bGUsIGlkeCkgID0+XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjW2lkeF0sIHdlYmxpbmtbaWR4XSlcclxuICAgIC8vICl9XHJcbiAgICAvLyB7Y29uc29sZS5sb2codGl0bGUsIGRlc2MsIHdlYmxpbmspfVxyXG5cclxud2luZG93LkVsZW1lbnRzID0gRWxlbWVudHM7Il19