'use strict';

/*global describe: false, it: false*/

var chai = require('chai');
var assert = chai.assert;
var later = require('../../');

describe('Index', function () {
    it('node-later', function () {
        assert.isFunction(later);
    });
});
