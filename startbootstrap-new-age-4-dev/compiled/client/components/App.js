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
      searchingFor: [['check'], ['The result will pop up here'], ['The hyperlink will be here'], ['please']]
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
          ' Click Here For Random Page'
        ),
        React.createElement('div', null),
        React.createElement(
          'div',
          null,
          React.createElement(WikipediaList, {
            searchFor: this.searchFor.bind(this),
            clickSearchFor: this.clickSearchFor.bind(this)
          }),
          React.createElement(ListToRender, { list: this.state.searchingFor })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlYXJjaEZvciIsInNlYXJjaFZhbHVlIiwic2V0U3RhdGUiLCJjbGlja1NlYXJjaEZvciIsImdldExpc3QiLCJ3aW5kb3ciLCJzZWFyY2hSZXN1bHQiLCIkIiwidmFsIiwiYmluZCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUNKLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLG9CQUFjLENBQ1osQ0FBQyxPQUFELENBRFksRUFFWixDQUFDLDZCQUFELENBRlksRUFHWixDQUFDLDRCQUFELENBSFksRUFJWixDQUFDLFFBQUQsQ0FKWTtBQURILEtBQWI7QUFRQSxVQUFLQyxTQUFMLEdBQWlCLFVBQUNDLFdBQUQsRUFBaUI7QUFDaEMsWUFBS0MsUUFBTCxDQUFjLEVBQUNILGNBQWNFLFdBQWYsRUFBZDtBQUNELEtBRkQ7QUFHQSxVQUFLRSxjQUFMLEdBQXNCLFlBQU07QUFDMUIsWUFBS0MsT0FBTCxHQUFlQyxPQUFPRCxPQUFQLENBQWUsTUFBS04sS0FBTCxDQUFXQyxZQUExQixFQUF3QyxVQUFDTyxZQUFELEVBQWtCO0FBQ3ZFLGNBQUtKLFFBQUwsQ0FBYztBQUNaSCx3QkFBY087QUFERixTQUFkO0FBR0QsT0FKYyxDQUFmO0FBS0FDLFFBQUUsVUFBRixFQUFjQyxHQUFkLENBQWtCLEVBQWxCO0FBQ0QsS0FQRDtBQWJpQjtBQXFCbEI7Ozs7NkJBRVM7QUFDUixhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFHLElBQUssWUFBUjtBQUNBLGtCQUFPLDhDQURQO0FBQUE7QUFBQSxTQURGO0FBR0Usd0NBSEY7QUFJRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxhQUFEO0FBQ0UsdUJBQVcsS0FBS1IsU0FBTCxDQUFlUyxJQUFmLENBQW9CLElBQXBCLENBRGI7QUFFRSw0QkFBZ0IsS0FBS04sY0FBTCxDQUFvQk0sSUFBcEIsQ0FBeUIsSUFBekI7QUFGbEIsWUFERjtBQUtFLDhCQUFDLFlBQUQsSUFBYyxNQUFNLEtBQUtYLEtBQUwsQ0FBV0MsWUFBL0I7QUFMRjtBQUpGLE9BREY7QUFjRDs7OztFQXZDZVcsTUFBTUMsUzs7QUEwQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNSTixPQUFPVCxHQUFQLEdBQWFBLEdBQWIiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2VhcmNoaW5nRm9yOiBbXHJcbiAgICAgICAgWydjaGVjayddLFxyXG4gICAgICAgIFsnVGhlIHJlc3VsdCB3aWxsIHBvcCB1cCBoZXJlJ10sXHJcbiAgICAgICAgWydUaGUgaHlwZXJsaW5rIHdpbGwgYmUgaGVyZSddLFxyXG4gICAgICAgIFsncGxlYXNlJ11cclxuICAgICAgXVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZWFyY2hGb3IgPSAoc2VhcmNoVmFsdWUpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNoaW5nRm9yOiBzZWFyY2hWYWx1ZX0pXHJcbiAgICB9XHJcbiAgICB0aGlzLmNsaWNrU2VhcmNoRm9yID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmdldExpc3QgPSB3aW5kb3cuZ2V0TGlzdCh0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciwgKHNlYXJjaFJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgc2VhcmNoaW5nRm9yOiBzZWFyY2hSZXN1bHRcclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgICAgJCgnLnRleHRCb3gnKS52YWwoJycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyICgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGEgaWQgPSBcInJhbmRvbVBhZ2VcIlxyXG4gICAgICAgIGhyZWYgPSBcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NwZWNpYWw6UmFuZG9tXCI+IENsaWNrIEhlcmUgRm9yIFJhbmRvbSBQYWdlPC9hPlxyXG4gICAgICAgIDxkaXY+PC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxXaWtpcGVkaWFMaXN0XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcj17dGhpcy5zZWFyY2hGb3IuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgY2xpY2tTZWFyY2hGb3I9e3RoaXMuY2xpY2tTZWFyY2hGb3IuYmluZCh0aGlzKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8TGlzdFRvUmVuZGVyIGxpc3Q9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfS8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuICAgICAgICAvLyAgIHtcclxuICAgICAgICAvLyAgICAgKCgpID0+IHtpZiAodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2codHJ1ZSk7XHJcbiAgICAgICAgLy8gICB9fSlcclxuICAgICAgICAvLyB9XHJcbndpbmRvdy5BcHAgPSBBcHA7Il19