var debug = require('debug')('sails-hook-responsetime'),
  _ = require('lodash');

/**
 * @param  {Sails} app
 * @return {Function}     [initialize]
 */
module.exports = function ToInitialize(app) {
  debug('starting initialize');

  /**
   * This function is triggered when the hook is loaded.
   *
   * @param  {Function} done
   */
  return function initialize(done) {

    // If disabled. Do not load anything
    if (app.config[this.configKey] === false) {
      debug('Hook not loaded: disabled by configuration');
      return done();
    }

    // Set up listener to bind shadow routes when the time is right.
    //
    // Always wait until after router has bound static routes.
    // If orm hook is enabled, also wait until models are known.
    var eventsToWaitFor = [];

    try {

      /**
       * List of hooks that required for this hook to work
       */
      var requiredHooks = [
        'http'
      ];
      /**
       * Check hooks availability
       */
      _.forEach(requiredHooks, function(hook) {
        if (!app.hooks[hook]) {
          throw new Error('Cannot use `' + this.configKey + '` hook without the `' + hook + '` hook.');
        }
        eventsToWaitFor.push('hook:' + hook + ':loaded');
      });

    } catch (err) {
      if (err) {
        return done(err);
      }
    }

    debug('waiting for', eventsToWaitFor);
    app.after(eventsToWaitFor, function() {
      //app.emit('hook:responsetime:loaded');
      debug('Hook initialized');
      done();
    });

  };
};