var leds = require("rpi-ws2801");

leds.connect(50); // number of LEDs 

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

setInterval(function() {
  for(var i = 0; i < 50; i++) {
    leds.setColor(i, colours[(c+i)%50]);
  }
  leds.update();
  c++;
}, 50);

