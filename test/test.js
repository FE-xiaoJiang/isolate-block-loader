var expect = require('chai').expect;
var isolate = require('../libs/isolate');
var fs = require('fs');

describe('single file', function() {
    var singleInvalid = fs.readFileSync('./test/testfiles/single-invalid.cml', 'utf-8');
    var singleValid = fs.readFileSync('./test/testfiles/single-valid.cml', 'utf-8');
    it('web build valid', function() {
        var content = isolate.isolate(singleValid, this, {cmlType: 'web'}, ['web', 'weex']);
        // console.log('=======>', content);
        expect(!/weeeeeeeeeeeeeeeeeeeex/m.test(content) && /weeeeeeeeeeeeeeeeeeeeb/m.test(content)).to.be.equal(true);
    })
    it('weex build valid', function() {
        var content = isolate.isolate(singleValid, this, {cmlType: 'weex'}, ['web', 'weex']);
        // console.log('=======>', content);
        expect(/weeeeeeeeeeeeeeeeeeeex/m.test(content) && !/weeeeeeeeeeeeeeeeeeeeb/m.test(content)).to.be.equal(true);
    })
    it('web build invalid', function() {
        var content = isolate.isolate(singleInvalid, this, {cmlType: 'web'}, ['web', 'weex']);
        // console.log('=======>', content);
        expect(/weeeeeeeeeeeeeeeeeeeex/m.test(content) && /weeeeeeeeeeeeeeeeeeeeb/m.test(content)).to.be.equal(true);
    })
    it('weex build invalid', function() {
        var content = isolate.isolate(singleInvalid, this, {cmlType: 'weex'}, ['web', 'weex']);
        // console.log('=======>', content);
        expect(/weeeeeeeeeeeeeeeeeeeex/m.test(content) && /weeeeeeeeeeeeeeeeeeeeb/m.test(content)).to.be.equal(true);
    })
})

describe('multi files ignore', function() {
    it('web cml file', function() {
        var resourcePath = '/Users/me/chameleon/packages/isolate-block-loader/test/testfiles/multi.web.cml';
        expect(isolate.checkMultiFiles({ resourcePath }, {}, ['web', 'weex'])).to.be.equal(true);
    })
    it('weex cml file', function() {
        var resourcePath = '/Users/me/chameleon/packages/isolate-block-loader/test/testfiles/multi.weex.cml';
        expect(isolate.checkMultiFiles({ resourcePath }, {}, ['web', 'weex'])).to.be.equal(true);
    })
})