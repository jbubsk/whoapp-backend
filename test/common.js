var request = require('supertest'),
    common = require('../src/common'),
    chai = require('chai'),
    //assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe.skip("Common module", function () {

    it("getDate should exist(format 'MM/dd/yyyy')", function () {
        should.exist(common.getDate, "getDate shouldn't be NULL");
        var date = new Date("12/20/2014");
        console.info(date);
        var date2 = common.getDate("12.20.2014");
        expect(date2).be.equal(date.getTime());
    });

    it("create date", function (done) {
        var stringDate = '1/23/2015',
            date;
        date = new Date(stringDate).getMonth();
        done();
    });
});