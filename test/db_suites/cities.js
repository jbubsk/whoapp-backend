var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB -> City suites -> ", function () {
    var cityService = require('../../src/services/cities/index');

    it("get city_id by city name", function (done) {
        cityService.getCityIdByName({name: 'Москва'}, function (err, cityId) {
            expect(err).to.equal(null, "error should equal NULL");
            expect(cityId[0].id).to.be.a("number", cityId[0].id + " should ba a 'number'");
            assert.typeOf(cityId[0].id, "number");

            done();
        })
    });

    it("get cities by name", function (done) {
        cityService.getCitiesByName('Моск', function (err, cities) {
            expect(err).to.equal(null, "error should equal NULL");
            cities.should.be.a('array');
            done();
        })
    });
});
