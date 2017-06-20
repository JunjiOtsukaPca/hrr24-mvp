'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      searchingFor: []
    };
    _this.searchFor = function (searchValue) {
      _this.setState({ searchingFor: searchValue });
    };
    _this.clickSearchFor = function () {
      _this.getList = window.getList(_this.state.searchingFor, function (searchResult) {
        _this.setState({
          searchingFor: searchResult
        });
      });
      $('.textBox').val('');
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { id: 'randomPage',
            href: 'https://en.wikipedia.org/wiki/Special:Random' },
          ' Click Here For Random Page '
        ),
        React.createElement(
          'div',
          null,
          React.createElement(WikipediaList, {
            searchFor: this.searchFor.bind(this),
            clickSearchFor: this.clickSearchFor.bind(this)
          }),
          React.createElement(ListToRender, { list: this.state.searchingFor })
        ),
        React.createElement(
          'div',
          null,
          'Hello npm'
        )
      );
    }
  }]);

  return App;
}(React.Component);

//   {
//     (() => {if (this.state.searchingFor) {
//     console.log(true);
//   }})
// }


window.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlYXJjaEZvciIsInNlYXJjaFZhbHVlIiwic2V0U3RhdGUiLCJjbGlja1NlYXJjaEZvciIsImdldExpc3QiLCJ3aW5kb3ciLCJzZWFyY2hSZXN1bHQiLCIkIiwidmFsIiwiYmluZCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUNKLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLG9CQUFjO0FBREgsS0FBYjtBQUdBLFVBQUtDLFNBQUwsR0FBaUIsVUFBQ0MsV0FBRCxFQUFpQjtBQUNoQyxZQUFLQyxRQUFMLENBQWMsRUFBQ0gsY0FBY0UsV0FBZixFQUFkO0FBQ0QsS0FGRDtBQUdBLFVBQUtFLGNBQUwsR0FBc0IsWUFBTTtBQUMxQixZQUFLQyxPQUFMLEdBQWVDLE9BQU9ELE9BQVAsQ0FBZSxNQUFLTixLQUFMLENBQVdDLFlBQTFCLEVBQXdDLFVBQUNPLFlBQUQsRUFBa0I7QUFDdkUsY0FBS0osUUFBTCxDQUFjO0FBQ1pILHdCQUFjTztBQURGLFNBQWQ7QUFHRCxPQUpjLENBQWY7QUFLQUMsUUFBRSxVQUFGLEVBQWNDLEdBQWQsQ0FBa0IsRUFBbEI7QUFDRCxLQVBEO0FBUmlCO0FBZ0JsQjs7Ozs2QkFFUztBQUNSLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUcsSUFBSyxZQUFSO0FBQ0Esa0JBQU8sOENBRFA7QUFBQTtBQUFBLFNBREY7QUFHRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxhQUFEO0FBQ0UsdUJBQVcsS0FBS1IsU0FBTCxDQUFlUyxJQUFmLENBQW9CLElBQXBCLENBRGI7QUFFRSw0QkFBZ0IsS0FBS04sY0FBTCxDQUFvQk0sSUFBcEIsQ0FBeUIsSUFBekI7QUFGbEIsWUFERjtBQUtFLDhCQUFDLFlBQUQsSUFBYyxNQUFNLEtBQUtYLEtBQUwsQ0FBV0MsWUFBL0I7QUFMRixTQUhGO0FBVUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVZGLE9BREY7QUFpQkQ7Ozs7RUFyQ2VXLE1BQU1DLFM7O0FBd0NoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDUk4sT0FBT1QsR0FBUCxHQUFhQSxHQUFiIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNlYXJjaGluZ0ZvcjogW11cclxuICAgIH1cclxuICAgIHRoaXMuc2VhcmNoRm9yID0gKHNlYXJjaFZhbHVlKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3NlYXJjaGluZ0Zvcjogc2VhcmNoVmFsdWV9KVxyXG4gICAgfVxyXG4gICAgdGhpcy5jbGlja1NlYXJjaEZvciA9ICgpID0+IHtcclxuICAgICAgdGhpcy5nZXRMaXN0ID0gd2luZG93LmdldExpc3QodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IsIChzZWFyY2hSZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIHNlYXJjaGluZ0Zvcjogc2VhcmNoUmVzdWx0XHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgICAgICQoJy50ZXh0Qm94JykudmFsKCcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxhIGlkID0gXCJyYW5kb21QYWdlXCJcclxuICAgICAgICBocmVmID0gXCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TcGVjaWFsOlJhbmRvbVwiPiBDbGljayBIZXJlIEZvciBSYW5kb20gUGFnZSA8L2E+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxXaWtpcGVkaWFMaXN0XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcj17dGhpcy5zZWFyY2hGb3IuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgY2xpY2tTZWFyY2hGb3I9e3RoaXMuY2xpY2tTZWFyY2hGb3IuYmluZCh0aGlzKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8TGlzdFRvUmVuZGVyIGxpc3Q9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfS8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIEhlbGxvIG5wbVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG4gICAgICAgIC8vICAge1xyXG4gICAgICAgIC8vICAgICAoKCkgPT4ge2lmICh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcikge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0cnVlKTtcclxuICAgICAgICAvLyAgIH19KVxyXG4gICAgICAgIC8vIH1cclxud2luZG93LkFwcCA9IEFwcDsiXX0=