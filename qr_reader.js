var QrCode = require('qrcode-reader');
var fs = require('fs');
var PNG = require('png-js');


var qr = new QrCode();

//qr.callback = function(result,err) { if(result) console.log(result) }

var c = fs.readFileSync(__dirname + '/qrcodeee.png');
var p = new PNG(c);

p.decode(function(data) {

        qr = new QrCode();
        qr.callback = function(result) {
            console.log(result);
        }
        qr.decode(p, data);
    });
