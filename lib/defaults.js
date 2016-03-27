'use strict';
/**
 *
 * @returns {object} Hook defaults acccessible using sails.config.responsetime
 *
 * [Hook defaults]{@link http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification/defaults}
 *
 * @author Luis Lobo Borobia
 *
 */

module.exports = {
  // This special keys allows installable hooks customization under
  // the /config/installableHooks.js config file
  // For more information check:
  // http://sailsjs.org/documentation/concepts/extending-sails/hooks/using-hooks#?changing-the-way-sails-loads-an-installable-hook
  __configKey__: {
    decimals: 4,
    header: 'X-Response-Time',
    template: "%dms" // Template to be used for the X-Response-Time
  }
};