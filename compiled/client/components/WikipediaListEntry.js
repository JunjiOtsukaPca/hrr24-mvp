'use strict';

var WikipediaListEntry = function WikipediaListEntry(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('input', {
      type: 'text',
      className: 'textBox',
      onChange: function onChange(e) {
        props.searchFor(e.target.value);
        console.log(e.target.value);
      }
    }),
    React.createElement(
      'button',
      { onClick: props.clickSearchFor },
      'Find Wiki'
    )
  );
};

window.WikipediaListEntry = WikipediaListEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1dpa2lwZWRpYUxpc3RFbnRyeS5qc3giXSwibmFtZXMiOlsiV2lraXBlZGlhTGlzdEVudHJ5IiwicHJvcHMiLCJlIiwic2VhcmNoRm9yIiwidGFyZ2V0IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiY2xpY2tTZWFyY2hGb3IiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsS0FBRDtBQUFBLFNBQ3ZCO0FBQUE7QUFBQTtBQUNFO0FBQ0UsWUFBSyxNQURQO0FBRUUsaUJBQVUsU0FGWjtBQUdFLGdCQUFVLGtCQUFDQyxDQUFELEVBQU87QUFDZkQsY0FBTUUsU0FBTixDQUFnQkQsRUFBRUUsTUFBRixDQUFTQyxLQUF6QjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZTCxFQUFFRSxNQUFGLENBQVNDLEtBQXJCO0FBQ0Q7QUFOSCxNQURGO0FBU0U7QUFBQTtBQUFBLFFBQVEsU0FBU0osTUFBTU8sY0FBdkI7QUFBQTtBQUFBO0FBVEYsR0FEdUI7QUFBQSxDQUF6Qjs7QUFjQUMsT0FBT1Qsa0JBQVAsR0FBNEJBLGtCQUE1QiIsImZpbGUiOiJXaWtpcGVkaWFMaXN0RW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgV2lraXBlZGlhTGlzdEVudHJ5ID0gKHByb3BzKSA9PiAoXHJcbiAgPGRpdj5cclxuICAgIDxpbnB1dFxyXG4gICAgICB0eXBlPSd0ZXh0J1xyXG4gICAgICBjbGFzc05hbWU9J3RleHRCb3gnXHJcbiAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xyXG4gICAgICAgIHByb3BzLnNlYXJjaEZvcihlLnRhcmdldC52YWx1ZSlcclxuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC52YWx1ZSlcclxuICAgICAgfX1cclxuICAgIC8+XHJcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e3Byb3BzLmNsaWNrU2VhcmNoRm9yfT5GaW5kIFdpa2k8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuKVxyXG5cclxud2luZG93Lldpa2lwZWRpYUxpc3RFbnRyeSA9IFdpa2lwZWRpYUxpc3RFbnRyeTsiXX0=