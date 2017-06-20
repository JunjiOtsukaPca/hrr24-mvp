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
            listOfResults: console.log(this.state.searchingFor),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlYXJjaEZvciIsInNlYXJjaFZhbHVlIiwic2V0U3RhdGUiLCJjbGlja1NlYXJjaEZvciIsImdldExpc3QiLCJ3aW5kb3ciLCJzZWFyY2hSZXN1bHQiLCIkIiwidmFsIiwiY29uc29sZSIsImxvZyIsImJpbmQiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFDSixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1hBLEtBRFc7O0FBRWpCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxvQkFBYztBQURILEtBQWI7QUFHQSxVQUFLQyxTQUFMLEdBQWlCLFVBQUNDLFdBQUQsRUFBaUI7QUFDaEMsWUFBS0MsUUFBTCxDQUFjLEVBQUNILGNBQWNFLFdBQWYsRUFBZDtBQUNELEtBRkQ7QUFHQSxVQUFLRSxjQUFMLEdBQXNCLFlBQU07QUFDMUIsWUFBS0MsT0FBTCxHQUFlQyxPQUFPRCxPQUFQLENBQWUsTUFBS04sS0FBTCxDQUFXQyxZQUExQixFQUF3QyxVQUFDTyxZQUFELEVBQWtCO0FBQ3ZFLGNBQUtKLFFBQUwsQ0FBYztBQUNaSCx3QkFBY087QUFERixTQUFkO0FBR0QsT0FKYyxDQUFmO0FBS0FDLFFBQUUsVUFBRixFQUFjQyxHQUFkLENBQWtCLEVBQWxCO0FBQ0QsS0FQRDtBQVJpQjtBQWdCbEI7Ozs7NkJBRVM7QUFDUixhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFHLElBQUssWUFBUjtBQUNBLGtCQUFPLDhDQURQO0FBQUE7QUFBQSxTQURGO0FBR0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsYUFBRDtBQUNFLDJCQUFlQyxRQUFRQyxHQUFSLENBQVksS0FBS1osS0FBTCxDQUFXQyxZQUF2QixDQURqQjtBQUVFLHVCQUFXLEtBQUtDLFNBQUwsQ0FBZVcsSUFBZixDQUFvQixJQUFwQixDQUZiO0FBR0UsNEJBQWdCLEtBQUtSLGNBQUwsQ0FBb0JRLElBQXBCLENBQXlCLElBQXpCO0FBSGxCO0FBREYsU0FIRjtBQVVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWRixPQURGO0FBaUJEOzs7O0VBckNlQyxNQUFNQyxTOztBQXdDeEJSLE9BQU9ULEdBQVAsR0FBYUEsR0FBYiIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnXHJcbiAgICB9XHJcbiAgICB0aGlzLnNlYXJjaEZvciA9IChzZWFyY2hWYWx1ZSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2hpbmdGb3I6IHNlYXJjaFZhbHVlfSlcclxuICAgIH1cclxuICAgIHRoaXMuY2xpY2tTZWFyY2hGb3IgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ2V0TGlzdCA9IHdpbmRvdy5nZXRMaXN0KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yLCAoc2VhcmNoUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBzZWFyY2hpbmdGb3I6IHNlYXJjaFJlc3VsdFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgICAkKCcudGV4dEJveCcpLnZhbCgnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIgKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8YSBpZCA9IFwicmFuZG9tUGFnZVwiXHJcbiAgICAgICAgaHJlZiA9IFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU3BlY2lhbDpSYW5kb21cIj4gQ2xpY2sgSGVyZSBGb3IgUmFuZG9tIFBhZ2UgPC9hPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8V2lraXBlZGlhTGlzdFxyXG4gICAgICAgICAgICBsaXN0T2ZSZXN1bHRzPXtjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcil9XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcj17dGhpcy5zZWFyY2hGb3IuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgY2xpY2tTZWFyY2hGb3I9e3RoaXMuY2xpY2tTZWFyY2hGb3IuYmluZCh0aGlzKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIEhlbGxvIG5wbVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuQXBwID0gQXBwOyJdfQ==