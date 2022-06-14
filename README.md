# Express GPIO RESTful API

Express server script for a RESTful API to access the Raspberry Pi's GPIO pins.

Turn pins on and off by sending GET requests to the Raspberry Pi.

Basic frontend can be [found here](https://github.com/rinzler100/gpio-frontend).

## Installation
First, make sure you have node.js and npm installed.

If you don't, open a terminal and type:

    sudo apt-get install nodejs npm node-semver

Now we need to allow your user to access the GPIO pins (can only be done from root by default). We are going to use GPIO Admin for that:

    git clone git://github.com/juangesino/quick2wire-gpio-admin.git
    cd quick2wire-gpio-admin
    make
    sudo make install
    sudo adduser $USER gpio

Logout and login again ([more info](https://github.com/juangesino/quick2wire-gpio-admin)).

Now we are ready to clone the server.

    git clone https://github.com/rinzler100/gpio-backend/
    cd express-gpio-rest-api
    npm install

To run the script:

    node app.js

## Usage

The server has 4 simple routes:

    GET /on/:pin_number
    GET /off/:pin_number
    GET /blink/:pin_number/:time_in_milliseconds
    GET /status/:pin_number

The first method just sets the pin HIGH.

The second method sets the pin LOW.

The third method sets the pin HIGH, waits the number of milliseconds you requested and then sets the pin LOW.

The status method reads the specified gpio pin's current status (0 or 1). If the light is not on or off this will return undefined.

The server script uses the node.js library [pi-gpio](https://www.npmjs.com/package/pi-gpio). This library uses the physical pin numbering (the '*Pin#*' in the image bellow) for the GPIO pins:

![Raspberry Pi GPIO Header](https://th.bing.com/th/id/R.953046f96aeb9ab53eb91abff2b24bc8?rik=RA66qfTT1kewGA&riu=http%3a%2f%2fwww.megaleecher.net%2fsites%2fdefault%2ffiles%2fimages%2fraspberry-pi-rev2-gpio-pinout.jpg&ehk=KjdYyiLBI2s17cdI925qKyvPDiwz5yLyPKZJpFv4%2f2Q%3d&risl=&pid=ImgRaw&r=0)

For more information about what pins to use please go to the [pi-gpio docs](https://www.npmjs.com/package/pi-gpio#about-the-pin-configuration).

## Examples

The server runs by default on port 3000 (you can change this on the app.js file).

The requests should be done to the Raspberry Pi's IP address (e.g.: *192.168.0.10:3000*).

**Turn pin 12 on**

    GET /on/12

**Turn pin 12 off**

    GET /off/12

**Turn pin 12 on for 2 seconds, then turn off**

    GET /blink/12/2000
    
**Retrieve the status of pin 12**

    GET /status/12

## Contributing

1. Fork it ( https://github.com/rinzler100/gpio-backend/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## TODO

 - Check for bad params.
 - GET request should show the pin state and PUT should be used to change state.
 - Ability to use buttons/input methods?
 - RGB light controller

## License

See [MIT-LICENSE](https://github.com/juangesino/express-gpio-rest-api/blob/master/LICENSE)
