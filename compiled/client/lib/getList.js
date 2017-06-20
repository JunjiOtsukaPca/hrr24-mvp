"use strict";

var getList = function getList(searchValue, callback) {

  var baseURL = 'https://en.wikipedia.org/w/api.php?';
  var searchURL = baseURL + "action=opensearch&search=" + searchValue + "&=content&format=json";

  $.ajax({
    url: searchURL,
    dataType: 'jsonp',
    type: 'GET',
    success: function success(data) {
      // do something with data
      if (callback) {
        callback(data);
      }
    },
    failure: function failure(err) {
      console.log(err);
    }
  });
};

window.getList = getList;

// var express = require('express');
// var app = express();

// app.get('https://en.wikipedia.org/w/api.php?', function(req, res){
//   res.
// });


// app.listen(8080, function(){
//   console.log('example app listening on 8080');
// })

// var xhr = new XMLHttpRequest();
// xhr.setRequestHeader( 'Api-User-Agent', 'Example/1.0' );

// $.get(searchURL)
// .done(function(data){
//   console.log(data);
// })
// .fail(function(err){
//   console.log(err);
// })
// console.log(searchURL)
//  $.ajax(settings).done(function (response) { console.log(response); });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9saWIvZ2V0TGlzdC5qcyJdLCJuYW1lcyI6WyJnZXRMaXN0Iiwic2VhcmNoVmFsdWUiLCJjYWxsYmFjayIsImJhc2VVUkwiLCJzZWFyY2hVUkwiLCIkIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwidHlwZSIsInN1Y2Nlc3MiLCJkYXRhIiwiZmFpbHVyZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFdBQUQsRUFBY0MsUUFBZCxFQUEyQjs7QUFFdkMsTUFBSUMsVUFBVSxxQ0FBZDtBQUNBLE1BQUlDLFlBQVlELFVBQVUsMkJBQVYsR0FBd0NGLFdBQXhDLEdBQXNELHVCQUF0RTs7QUFFQUksSUFBRUMsSUFBRixDQUFPO0FBQ0xDLFNBQUtILFNBREE7QUFFTEksY0FBVSxPQUZMO0FBR0xDLFVBQU0sS0FIRDtBQUlMQyxhQUFTLGlCQUFTQyxJQUFULEVBQWU7QUFDckI7QUFDRCxVQUFJVCxRQUFKLEVBQWM7QUFDWkEsaUJBQVNTLElBQVQ7QUFDRDtBQUNGLEtBVEk7QUFVTEMsYUFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxjQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRDtBQVpJLEdBQVA7QUFjRCxDQW5CRDs7QUFxQkFHLE9BQU9oQixPQUFQLEdBQWlCQSxPQUFqQjs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGIiwiZmlsZSI6ImdldExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0TGlzdCA9IChzZWFyY2hWYWx1ZSwgY2FsbGJhY2spID0+IHtcclxuXHJcbiAgdmFyIGJhc2VVUkwgPSAnaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvYXBpLnBocD8nXHJcbiAgdmFyIHNlYXJjaFVSTCA9IGJhc2VVUkwgKyBcImFjdGlvbj1vcGVuc2VhcmNoJnNlYXJjaD1cIiArIHNlYXJjaFZhbHVlICsgXCImPWNvbnRlbnQmZm9ybWF0PWpzb25cIlxyXG5cclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiBzZWFyY2hVUkwsXHJcbiAgICBkYXRhVHlwZTogJ2pzb25wJyxcclxuICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggZGF0YVxyXG4gICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZhaWx1cmU6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbndpbmRvdy5nZXRMaXN0ID0gZ2V0TGlzdDtcclxuXHJcblxyXG5cclxuLy8gdmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbi8vIHZhciBhcHAgPSBleHByZXNzKCk7XHJcblxyXG4vLyBhcHAuZ2V0KCdodHRwczovL2VuLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwPycsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuLy8gICByZXMuXHJcbi8vIH0pO1xyXG5cclxuXHJcbi8vIGFwcC5saXN0ZW4oODA4MCwgZnVuY3Rpb24oKXtcclxuLy8gICBjb25zb2xlLmxvZygnZXhhbXBsZSBhcHAgbGlzdGVuaW5nIG9uIDgwODAnKTtcclxuLy8gfSlcclxuXHJcbiAgLy8gdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIC8vIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCAnQXBpLVVzZXItQWdlbnQnLCAnRXhhbXBsZS8xLjAnICk7XHJcblxyXG4gIC8vICQuZ2V0KHNlYXJjaFVSTClcclxuICAvLyAuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAvLyAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gIC8vIH0pXHJcbiAgLy8gLmZhaWwoZnVuY3Rpb24oZXJyKXtcclxuICAvLyAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgLy8gfSlcclxuICAvLyBjb25zb2xlLmxvZyhzZWFyY2hVUkwpXHJcbi8vICAkLmFqYXgoc2V0dGluZ3MpLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKTsgfSk7XHJcblxyXG4iXX0=