// var express = require('express');
// var app = express();

// app.get('https://en.wikipedia.org/w/api.php?', function(req, res){
//   res.
// });


// app.listen(8080, function(){
//   console.log('example app listening on 8080');
// })


var getList = (searchValue) => {

  var baseURL = 'https://en.wikipedia.org/w/api.php?'
  var searchURL = baseURL + "action=opensearch&search=" + searchValue + "&=content&format=json"

  xhr.setRequestHeader( 'Api-User-Agent', 'Example/1.0' );
  $.get(searchURL)
  .done(function(data){
    console.log(data);
  })
  .fail(function(err){
    console.log(err);
  })
}

window.getList = getList;