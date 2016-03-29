# responsetime

---

[![npm version](https://badge.fury.io/js/sails-hook-responsetime.svg)](https://badge.fury.io/js/sails-hook-responsetime)
[![Dependencies](https://david-dm.org/luislobo/sails-hook-responsetime.svg)](https://david-dm.org/luislobo/sails-hook-responsetime)
[![Build Status](https://travis-ci.org/luislobo/sails-hook-responsetime.svg?branch=master)](https://travis-ci.org/luislobo/sails-hook-responsetime)

---

`responsetime` hook for Sails v0.11 and up.

Adds X-Response-Time to both HTTP and Socket headers requests.

## Installation

Install from NPM.

```bash
$ npm install sails-hook-responsetime --save
```

## Configuration options available

To configure this hook, you can create a file named `config/responsetime.js`
with the following options:

```javascript
module.exports.responsetime = {
  header: 'X-Response-Time', // Header string used to return with the response time
  template: "%dms", // Template to be used for the X-Response-Time
  decimals: 4 // Number of decimals to return
};
```

Those are the hook defaults, if you don't create the mentioned config file.

For each request, both regular HTTP or socket ones, it will return a header with
the response time.

If you want to add more precision to the requests reported, you should add this
configuration to your `config/http.js` file:

```javascript
module.exports.http = {

  middleware: {
    order: [
      '_startRequestTime', // <<< this should be added FIRST
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
    // this function needs to be added, too
    _startRequestTime: function(req, res, next) {
      req._startRequestTime = process.hrtime();
      next();
    }
```

This configuration makes the Express middleware to start recording the start
time right after it starts resolving the request.

## License

The MIT License (MIT)

Copyright (c) 2016 Luis Lobo Borobia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
