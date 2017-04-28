'use strict';

var semver = require('semver');

var nodejsVersion = process.version.substring(1);

/*eslint-disable valid-jsdoc*/
//jscs:disable jsDoc
/**
 * Returns a defer function.
 *
 * @function
 * @alias later
 * @public
 * @param {Boolean} [ioSafe=false] - True ensure IO safe implementation which will prevent stack overflow errors
 * @returns {function} A defer function
 * @example
 * ```js
 * //get a defer function
 * var defer = later();
 *
 * //use defer function
 * defer(onCallback() {
 *   //do something
 * });
 * ```
 *
 * @also
 *
 * Returns a defer function.
 *
 * @function
 * @alias later
 * @public
 * @param {String} [comptibleVersion=process.version] - The nodejs version the defer function should be compatible with
 * @returns {function} A defer function
 * @example
 * ```js
 * //get a defer function based on current nodejs version
 * var defer = later();
 *
 * //use defer function
 * defer(onCallback() {
 *   //do something
 * });
 *
 * //get a defer function based on a specific node.js version
 * defer = later('0.10.0'); //let be compatible with node.js 0.10 regardless of our current node.js runtime
 *
 * //use defer function
 * defer(onCallback() {
 *   //do something
 * });
 * ```
 */
module.exports = function later(comptibleVersionOrIOSafe) {
    var deferCallback = process.nextTick;

    /*istanbul ignore else*/
    if (comptibleVersionOrIOSafe) {
        if (typeof comptibleVersionOrIOSafe === 'boolean') {
            deferCallback = setImmediate;
        } else if (semver.lt(comptibleVersionOrIOSafe, '0.12.0')) {
            deferCallback = setImmediate;
        }
    } else if (semver.lt(nodejsVersion, '0.12.0')) {
        deferCallback = setImmediate;
    }

    return deferCallback;
};
//jscs:enable jsDoc
/*eslint-enable valid-jsdoc*/
