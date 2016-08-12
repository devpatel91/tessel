var express = require('express');
var morgan = require('morgan');
var qr_reader = require('./qr_reader');
var http = require('http');
var image;

setTimeout(function(){
  var options = {
      hostname: 'http://tessel-02a38f3f910e.local:8080',
      method: 'GET',
    }
  http.get('http://tessel-02a38f3f910e.local:8080/', function(response){
    //http.request(options, function(response){
      // response.setEncoding('base64'); //?
      response.on('data', function(image){
        console.log(image)
        var decoded = qr_reader(image);
        console.log(decoded);
        //response.send(decoded);
      })


    // var options = {
    //   hostname: 'http://localhost',
    //   port: 5577,
    //   path: '/',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type':' image/jpg'
    //   }
    // }
    // http.request(options, function(res){
    //   res.write(image);
    //   res.end()
    // })
  });
}, 0);


var app = express();

app.use(morgan('dev'));


app.get('/', function(req, res, next){
  res.send('You have reached Ten\'s computer');
})

app.post('/', function(req, res, next){
  var imagePng = res.body; //Get image from post
  var decoded = qr_reader(imagePng);
  console.log(decoded);
  res.send(decoded);
})


app.use(function(err, req, res, next){
  res.send(err);
})

app.listen(5577, function(){
  console.log('You are up running on port 5577');
})


