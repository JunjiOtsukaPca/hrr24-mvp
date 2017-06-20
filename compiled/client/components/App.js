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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInNlYXJjaGluZ0ZvciIsInNlYXJjaEZvciIsInNlYXJjaFZhbHVlIiwic2V0U3RhdGUiLCJjbGlja1NlYXJjaEZvciIsImdldExpc3QiLCJ3aW5kb3ciLCJzZWFyY2hSZXN1bHQiLCIkIiwidmFsIiwiYmluZCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUNKLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLG9CQUFjLENBQ1osQ0FBQyxPQUFELENBRFksRUFFWixDQUFDLDZCQUFELENBRlksRUFHWixDQUFDLDRCQUFELENBSFksRUFJWixDQUFDLFFBQUQsQ0FKWTtBQURILEtBQWI7QUFRQSxVQUFLQyxTQUFMLEdBQWlCLFVBQUNDLFdBQUQsRUFBaUI7QUFDaEMsWUFBS0MsUUFBTCxDQUFjLEVBQUNILGNBQWNFLFdBQWYsRUFBZDtBQUNELEtBRkQ7QUFHQSxVQUFLRSxjQUFMLEdBQXNCLFlBQU07QUFDMUIsWUFBS0MsT0FBTCxHQUFlQyxPQUFPRCxPQUFQLENBQWUsTUFBS04sS0FBTCxDQUFXQyxZQUExQixFQUF3QyxVQUFDTyxZQUFELEVBQWtCO0FBQ3ZFLGNBQUtKLFFBQUwsQ0FBYztBQUNaSCx3QkFBY087QUFERixTQUFkO0FBR0QsT0FKYyxDQUFmO0FBS0FDLFFBQUUsVUFBRixFQUFjQyxHQUFkLENBQWtCLEVBQWxCO0FBQ0QsS0FQRDtBQWJpQjtBQXFCbEI7Ozs7NkJBRVM7QUFDUixhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFHLElBQUssWUFBUjtBQUNBLGtCQUFPLDhDQURQO0FBQUE7QUFBQSxTQURGO0FBR0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsYUFBRDtBQUNFLHVCQUFXLEtBQUtSLFNBQUwsQ0FBZVMsSUFBZixDQUFvQixJQUFwQixDQURiO0FBRUUsNEJBQWdCLEtBQUtOLGNBQUwsQ0FBb0JNLElBQXBCLENBQXlCLElBQXpCO0FBRmxCLFlBREY7QUFLRSw4QkFBQyxZQUFELElBQWMsTUFBTSxLQUFLWCxLQUFMLENBQVdDLFlBQS9CO0FBTEYsU0FIRjtBQVVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWRixPQURGO0FBaUJEOzs7O0VBMUNlVyxNQUFNQyxTOztBQTZDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ1JOLE9BQU9ULEdBQVAsR0FBYUEsR0FBYiIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzZWFyY2hpbmdGb3I6IFtcclxuICAgICAgICBbJ2NoZWNrJ10sXHJcbiAgICAgICAgWydUaGUgcmVzdWx0IHdpbGwgcG9wIHVwIGhlcmUnXSxcclxuICAgICAgICBbJ1RoZSBoeXBlcmxpbmsgd2lsbCBiZSBoZXJlJ10sXHJcbiAgICAgICAgWydwbGVhc2UnXVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgICB0aGlzLnNlYXJjaEZvciA9IChzZWFyY2hWYWx1ZSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2hpbmdGb3I6IHNlYXJjaFZhbHVlfSlcclxuICAgIH1cclxuICAgIHRoaXMuY2xpY2tTZWFyY2hGb3IgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ2V0TGlzdCA9IHdpbmRvdy5nZXRMaXN0KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yLCAoc2VhcmNoUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBzZWFyY2hpbmdGb3I6IHNlYXJjaFJlc3VsdFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgICAkKCcudGV4dEJveCcpLnZhbCgnJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIgKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8YSBpZCA9IFwicmFuZG9tUGFnZVwiXHJcbiAgICAgICAgaHJlZiA9IFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU3BlY2lhbDpSYW5kb21cIj4gQ2xpY2sgSGVyZSBGb3IgUmFuZG9tIFBhZ2UgPC9hPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8V2lraXBlZGlhTGlzdFxyXG4gICAgICAgICAgICBzZWFyY2hGb3I9e3RoaXMuc2VhcmNoRm9yLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgIGNsaWNrU2VhcmNoRm9yPXt0aGlzLmNsaWNrU2VhcmNoRm9yLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPExpc3RUb1JlbmRlciBsaXN0PXt0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcn0vPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICBIZWxsbyBucG1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuICAgICAgICAvLyAgIHtcclxuICAgICAgICAvLyAgICAgKCgpID0+IHtpZiAodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2codHJ1ZSk7XHJcbiAgICAgICAgLy8gICB9fSlcclxuICAgICAgICAvLyB9XHJcbndpbmRvdy5BcHAgPSBBcHA7Il19