'use strict';

const chai = require('chai');
const assert = chai.assert;
const later = require('../../');

describe('Index', function () {
    it('node-later', function () {
        assert.isFunction(later);
    });
});
