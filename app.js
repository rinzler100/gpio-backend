var http = require('http');
var express = require('express');
var app = express();

var gpio = require("pi-gpio");

app.use(require('cors')());

//startup -> pin 7 off
gpio.close(7);
gpio.open(7, "output", function(err) {
	gpio.write(7, 0, function(){
		console.log('Pin 7 has been set to off.')
	});
});


app.get('/on/:pin', function(req, res) {
  gpioPin = req.params.pin;
	gpio.close(gpioPin);
  gpio.open(gpioPin, "output", function(err) {
    gpio.write(gpioPin, 1, function() {
      console.log('Pin '+ gpioPin +' is now HIGH.');
			res.sendStatus(200);
    });
  });
});

app.get('/off/:pin', function(req, res) {
  gpioPin = req.params.pin;
	gpio.close(gpioPin);
  gpio.open(gpioPin, "output", function(err) {
		gpio.write(gpioPin, 0, function() {
			console.log('Pin '+ gpioPin +' is now LOW.');
			res.sendStatus(200);
		});
  });
});

app.get('/blink/:pin/:time', function(req, res) {
	gpioPin = req.params.pin;
	time = req.params.time;
	gpio.close(gpioPin);
  gpio.open(gpioPin, "output", function(err) {
    gpio.write(gpioPin, 1, function() {
      console.log('Pin '+ gpioPin +' is now HIGH.');
    });
    setTimeout(function() {
      gpio.write(gpioPin, 0, function() {
        console.log('Pin '+ gpioPin +' is now LOW.');
				res.sendStatus(200);
        gpio.close(gpioPin);
      });
    }, time);
  });
});


app.get('/status/:pin', function(req, res) {
	gpioPin = req.params.pin;
	gpio.read(gpioPin, function(err, value) {
    	if(err) {
		console.log(err)
	}
    	console.log(value);	// The current state of the pin
	res.json({"status": `${value}`});
	});
});


app.listen(3000);
console.log('App Server running at port 3000');


//npm package usage here: https://www.npmjs.com/package/pi-gpio#about-the-pin-configuration
