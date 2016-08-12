var QrCode = require('qrcode-reader');
var fs = require('fs');
var PNG = require('png-js');

var qr = new QrCode();


// var fileName = __dirname + '/qrcodeee.jpeg';
// var c = fs.readFileSync(__dirname + '/qrcodeee.jpeg');


// var p = new JPG(c);
// pngToJpg({
//   input: p,
//   output: fileName.substring(0, fileName.indexOf('.')) + 'png',
// }, function(){
//   console.log('png')
// })

// p.decode(function(data) {

//         qr = new QrCode();
//         qr.callback = function(result) {
//             console.log(result);
//         }
//         qr.decode(p, data);
//     });


var qr_reader = function(file){
  //var c = fs.readFileSync(pngPath);
  var p = new PNG(file);

  p.decode(function(data) {
      qr = new QrCode();
      qr.callback = function(result) {
           return result;
      }
      qr.decode(p, data);
  });
}
 
module.exports = qr_reader;