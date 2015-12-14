var leds = require("rpi-ws2801");
var jimp = require("jimp");

leds.connect(50); // number of LEDs 

var map = [
  [49, 30, 29, 10, 9],
  [48, 31, 28, 11, 8],
  [47, 32, 27, 12, 7],
  [46, 33, 26, 13, 6],
  [45, 34, 25, 14, 5],
  [44, 35, 24, 15, 4],
  [43, 36, 23, 16, 3],
  [42, 37, 22, 17, 2],
  [41, 38, 21, 18, 1],
  [40, 39, 20, 19, 0]
];

var colours = [];

function RGB2Color(r,g,b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

var frequency = Math.PI / 25;
for (var i = 0; i < 50; ++i) {
  var red   = Math.sin(frequency*i + 0) * 127 + 128;
  var green = Math.sin(frequency*i + (Math.PI * (2.0/3.0))) * 127 + 128;
  var blue  = Math.sin(frequency*i + (Math.PI * (4.0/3.0))) * 127 + 128;

  colours[i] = [red, green, blue];
}

var c = 0;

jimp.read("test.png").then(function(hello) {
  var width = hello.bitmap.width;
  var height = hello.bitmap.height;
  var offset = -10;
 
  console.log("height "+height+", width "+width);
  console.log("RGB "+hello.getPixelColour(0,0));
   
  setInterval( function() {
    for(var x=0; x<10; x++) {
      for(var y=0; y<5; y++) {
        var colour = 0;
        if(x+offset >=0 && x+offset<width) {
          colour = hello.getPixelColour(x+offset, y);
        }
        var rgb = jimp.intToRGBA(colour);
        leds.setColor(map[x][y], [rgb.r,rgb.g, rgb.b]);
      }
    }

    leds.update(); 
    if(++offset > width+10) offset = -10;  
  }, 40 );
}).catch(function(err) {
  console.error(err);
});
