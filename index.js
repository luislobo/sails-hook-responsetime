'use strict';

/**
 * Sails Hook Response Time Hook
 *
 * @param {type} app - Sails object
 */
module.exports = function(app) {
  return {
    defaults: require('./lib/defaults'),
    initialize: require('./lib/initialize')(app),
    routes: {
      before: {
        'all /*': require('./lib/beforeAll')(app)
      }
    }
  };
};