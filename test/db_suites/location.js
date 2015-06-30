var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB -> Location suites -> ", function () {
    var locationService = require('../../src/services/location'),
        userService = require('../../src/services/users'),
        userId;

    before(function (done) {
        userService.getAllUsers(function (err, result) {
            expect(err).to.equal(null);
            result.should.be.a('array');
            result.length.should.not.equal(0);
            userId = result[0].id;
            done();
        });
    });

    it("set location for user", function (done) {
        locationService.setLocation({
            userId: userId,
            latitude: 45.3434334,
            longitude: 37.343444
        }, function (err, result) {
            expect(err).to.equal(null);
            done();
        });
    });

});
