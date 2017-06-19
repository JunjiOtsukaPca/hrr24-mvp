var express = require('express');
var app = express();

app.get('/');


app.listen(8080, function(){
  console.log('example app listening on 8080');
})