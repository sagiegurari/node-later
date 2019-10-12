'use strict';

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

        it('requested 0.12.0', function (done) {
            var defer = later('0.12.0');
            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('requested 0.12.1', function (done) {
            var defer = later('0.12.1');
            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('requested 0.10.x', function (done) {
            var defer = later('0.10.1000');
            assert.strictEqual(setImmediate, defer);
            defer(done);
        });

        it('runtime 0.12.0', function (done) {
            var nodejsVersion = later.nodejsVersion;
            later.nodejsVersion = '0.12.0';

            var defer = later();
            later.nodejsVersion = nodejsVersion;

            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('runtime 0.12.1', function (done) {
            var nodejsVersion = later.nodejsVersion;
            later.nodejsVersion = '0.12.1';

            var defer = later();
            later.nodejsVersion = nodejsVersion;

            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('runtime 0.10.x', function (done) {
            var nodejsVersion = later.nodejsVersion;
            later.nodejsVersion = '0.10.1000';

            var defer = later();
            later.nodejsVersion = nodejsVersion;

            assert.strictEqual(setImmediate, defer);
            defer(done);
        });
    });
});
