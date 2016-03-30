var onHeaders = require('on-headers'),
  util = require('util');

/**
 * 
 * @param {Sails} app
 * @returns {Function} [toBeforeAll]
 */
module.exports = function toBeforeAll(app) {
  return function(req, res, next) {
    if (req._startRequestTime && req._startRequestTime instanceof Array && req._startRequestTime.length === 2) {
      req._timeStart = req._startRequestTime;
    }
    if (!req._timeStart) {
      req._timeStart = process.hrtime();
    }
    var config = app.config.responsetime;
    var template = config.template;
    var decimals = config.decimals;
    var header = config.header;

    onHeaders(res, function() {
      if (!this.getHeader(header) && req._timeStart) {
        var diff = process.hrtime(req._timeStart);
        var time = diff[0] * 1e3 + diff[1] * 1e-6;
        this.setHeader(header, util.format(template, time.toFixed(decimals)));
      }
    });
    return next();
  };
};