'use strict';

/*global describe: false, it: false*/

var chai = require('chai');
var assert = chai.assert;
var later = require('../../lib/node-later');

describe('later', function () {
    describe('get', function () {
        it('undefined', function (done) {
            var defer = later();
            defer(done);
        });

        it('null', function (done) {
            var defer = later(null);
            defer(done);
        });

        it('ioSafe', function (done) {
            var defer = later(true);
            assert.strictEqual(setImmediate, defer);
            defer(done);
        });

        it('0.12.0', function (done) {
            var defer = later('0.12.0');
            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('0.12.1', function (done) {
            var defer = later('0.12.1');
            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('0.10.x', function (done) {
            var defer = later('0.10.1000');
            assert.strictEqual(setImmediate, defer);
            defer(done);
        });
    });
});
