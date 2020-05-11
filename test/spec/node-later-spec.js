'use strict';

const chai = require('chai');
const assert = chai.assert;
const later = require('../../lib/node-later');

describe('later', function () {
    describe('get', function () {
        it('undefined', function (done) {
            const defer = later();
            defer(done);
        });

        it('null', function (done) {
            const defer = later(null);
            defer(done);
        });

        it('ioSafe', function (done) {
            const defer = later(true);
            assert.strictEqual(setImmediate, defer);
            defer(done);
        });

        it('requested 0.12.0', function (done) {
            const defer = later('0.12.0');
            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('requested 0.12.1', function (done) {
            const defer = later('0.12.1');
            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('requested 0.10.x', function (done) {
            const defer = later('0.10.1000');
            assert.strictEqual(setImmediate, defer);
            defer(done);
        });

        it('runtime 0.12.0', function (done) {
            const nodejsVersion = later.nodejsVersion;
            later.nodejsVersion = '0.12.0';

            const defer = later();
            later.nodejsVersion = nodejsVersion;

            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('runtime 0.12.1', function (done) {
            const nodejsVersion = later.nodejsVersion;
            later.nodejsVersion = '0.12.1';

            const defer = later();
            later.nodejsVersion = nodejsVersion;

            assert.strictEqual(process.nextTick, defer);
            defer(done);
        });

        it('runtime 0.10.x', function (done) {
            const nodejsVersion = later.nodejsVersion;
            later.nodejsVersion = '0.10.1000';

            const defer = later();
            later.nodejsVersion = nodejsVersion;

            assert.strictEqual(setImmediate, defer);
            defer(done);
        });
    });
});
