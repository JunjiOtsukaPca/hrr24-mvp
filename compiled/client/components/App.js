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
      searchingFor: ''
    };
    _this.searchFor = function (searchValue) {
      _this.setState({ searchingFor: searchValue });
    };
    _this.clickSearchFor = function () {
      console.log(_this.state.searchingFor);
      _this.getList = window.getList(_this.state.searchingFor);
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
            getList: this.getList,
            searchFor: this.searchFor.bind(this),
            clickSearchFor: this.clickSearchFor.bind(this)
          })
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

window.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlYXJjaEZvciIsInNlYXJjaFZhbHVlIiwic2V0U3RhdGUiLCJjbGlja1NlYXJjaEZvciIsImNvbnNvbGUiLCJsb2ciLCJnZXRMaXN0Iiwid2luZG93IiwiJCIsInZhbCIsImJpbmQiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFDSixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1hBLEtBRFc7O0FBRWpCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxvQkFBYztBQURILEtBQWI7QUFHQSxVQUFLQyxTQUFMLEdBQWlCLFVBQUNDLFdBQUQsRUFBaUI7QUFDaEMsWUFBS0MsUUFBTCxDQUFjLEVBQUNILGNBQWNFLFdBQWYsRUFBZDtBQUNELEtBRkQ7QUFHQSxVQUFLRSxjQUFMLEdBQXNCLFlBQU07QUFDMUJDLGNBQVFDLEdBQVIsQ0FBWSxNQUFLUCxLQUFMLENBQVdDLFlBQXZCO0FBQ0EsWUFBS08sT0FBTCxHQUFlQyxPQUFPRCxPQUFQLENBQWUsTUFBS1IsS0FBTCxDQUFXQyxZQUExQixDQUFmO0FBQ0FTLFFBQUUsVUFBRixFQUFjQyxHQUFkLENBQWtCLEVBQWxCO0FBQ0QsS0FKRDtBQVJpQjtBQWFsQjs7Ozs2QkFFUztBQUNSLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUcsSUFBSyxZQUFSO0FBQ0Esa0JBQU8sOENBRFA7QUFBQTtBQUFBLFNBREY7QUFHRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxhQUFEO0FBQ0UscUJBQVMsS0FBS0gsT0FEaEI7QUFFRSx1QkFBVyxLQUFLTixTQUFMLENBQWVVLElBQWYsQ0FBb0IsSUFBcEIsQ0FGYjtBQUdFLDRCQUFnQixLQUFLUCxjQUFMLENBQW9CTyxJQUFwQixDQUF5QixJQUF6QjtBQUhsQjtBQURGLFNBSEY7QUFVRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVkYsT0FERjtBQWlCRDs7OztFQWxDZUMsTUFBTUMsUzs7QUFxQ3hCTCxPQUFPWCxHQUFQLEdBQWFBLEdBQWIiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2VhcmNoaW5nRm9yOiAnJ1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWFyY2hGb3IgPSAoc2VhcmNoVmFsdWUpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNoaW5nRm9yOiBzZWFyY2hWYWx1ZX0pXHJcbiAgICB9XHJcbiAgICB0aGlzLmNsaWNrU2VhcmNoRm9yID0gKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcik7XHJcbiAgICAgIHRoaXMuZ2V0TGlzdCA9IHdpbmRvdy5nZXRMaXN0KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcclxuICAgICAgJCgnLnRleHRCb3gnKS52YWwoJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyICgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGEgaWQgPSBcInJhbmRvbVBhZ2VcIlxyXG4gICAgICAgIGhyZWYgPSBcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NwZWNpYWw6UmFuZG9tXCI+IENsaWNrIEhlcmUgRm9yIFJhbmRvbSBQYWdlIDwvYT5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPFdpa2lwZWRpYUxpc3RcclxuICAgICAgICAgICAgZ2V0TGlzdD17dGhpcy5nZXRMaXN0fVxyXG4gICAgICAgICAgICBzZWFyY2hGb3I9e3RoaXMuc2VhcmNoRm9yLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgIGNsaWNrU2VhcmNoRm9yPXt0aGlzLmNsaWNrU2VhcmNoRm9yLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICBIZWxsbyBucG1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxud2luZG93LkFwcCA9IEFwcDsiXX0=