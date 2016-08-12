var express = require('express');
var morgan = require('morgan');
var qr_reader = require('./qr_reader');
var http = require('http');
var fs = require('fs');
var convert = require('netpbm').convert;
var qrnode = require('qrnode');
var image;
var tesseract = require('node-tesseract');

var app = express();

var twilio = require('twilio');
var SID = 'AC4b1084e91ef7827d7960d04494812557';
var TOKEN = 'bdc291f370d6da139ea3569d44dd0d02';
var client = twilio(SID, TOKEN);

setInterval(function(){
  var options = {
      hostname: 'http://tessel-02a38f3f910e.local:8080',
      method: 'GET',
    }
  http.get('http://tessel-02a38f3f910e.local:8080/', function(response){
    //http.request(options, function(response){
      // response.setEncoding('base64'); //?
      data = [];
      response.on('data', function(imageChunk){
        data.push(imageChunk);
        //response.send(decoded);
      }).on('end', function(){
        var buffer = Buffer.concat(data);
        fs.writeFileSync('image.jpg', buffer);
        tesseract.process(__dirname + '/image.jpg',function(err, text) {
            if(err) {
                console.error(err);
            } else {
                console.log(text);
                console.log('image read');
                if(text !== '')
                client.sendMessage({
                       to: '+18152525372',
                       from: '+18156817292',
                       body: 'Chris, REMEMBER TO BUY ' + text
                   });
            }
        });
      })
  });
}, 5000);

// tesseract.process(__dirname + '/gotmilk.jpg',function(err, text) {
//     if(err) {
//         console.error(err);
//     } else {
//         console.log(text);
//     }
// });
 
// Recognize text of any language in any format


// var file = fs.readFileSync('qrcodeee.png')
// console.log(file);
// qr_reader(file);



// var app = express();

// app.use(morgan('dev'));


// app.get('/', function(req, res, next){
//   res.send('You have reached Ten\'s computer');
// })

// app.post('/', function(req, res, next){
//   var imagePng = res.body; //Get image from post
//   var decoded = qr_reader(imagePng);
//   console.log(decoded);
//   res.send(decoded);
// })


// app.use(function(err, req, res, next){
//   res.send(err);
// })

// app.listen(5577, function(){
//   console.log('You are up running on port 5577');
// })


