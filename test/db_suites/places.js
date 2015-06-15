var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB -> Places suites -> ", function () {
    var pool = require('../../src/db_pool'),
        placeService = require('../../src/services/place'),
        placeId;

    it("delete all places", function (done) {

        pool.getConnection(function (connection) {
            connection.query("DELETE FROM place_details WHERE id > 0", function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                connection.query("DELETE FROM place WHERE id > 0", function (err) {
                    expect(err).to.equal(null, "error should equal NULL");
                    done();
                });
            });
        }, function (err) {
            console.log(err);
        })
    });

    it("add first place", function (done) {

        placeService.addPlace({
            name: 'Лучшее место',
            city: 'Москва',
            cityId: 13658,
            address: 'Москва, проспект Улиц, 5'
        }, function (err) {
            expect(err).to.equal(null, "error should equal NULL");
            done();
        });
    });

    it("add second place", function (done) {

        placeService.addPlace({
            name: 'Не Лучшее место',
            city: 'Москва',
            cityId: 13658,
            address: 'Москва, проспект Таганский, 5'
        }, function (err) {
            expect(err).to.equal(null, "error should equal NULL");
            done();
        });
    });

    it("get all places", function (done) {

        placeService.getAllPlaces(function (err, places) {
            expect(err).to.equal(null, "error should equal NULL");
            places.should.be.a('array');
            places.should.have.length(2);
            placeId = places[0].id;
            done();
        });
    });

    it("delete place by id", function (done) {

        placeService.deletePlace(placeId, function (err, result) {
            expect(err).to.equal(null, "error should equal NULL");
            console.log(result);
            done();
        });
    });

    it("get all places after deleting", function (done) {
        placeService.getAllPlaces(function (err, places) {
            expect(err).to.equal(null, "error should equal NULL");
            places.should.be.a('array');
            places.should.have.length(1, "array has to have 1 element");
            done();
        });
    });
});
