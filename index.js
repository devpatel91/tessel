var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));


app.get('/', function(req, res, next){
  res.send('You have reached Ten\'s computer');
})

app.use(function(err, req, res, next){
  res.send(err);
})

app.listen(5577, function(){
  console.log('You are up running on port 5577');
})