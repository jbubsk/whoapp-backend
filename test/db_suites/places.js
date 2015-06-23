var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB -> Places suites -> ", function () {
    var pool = require('../../src/db-pool'),
        placeService = require('../../src/services/places'),
        placeId;

    it("delete all places", function (done) {

        pool.getConnection(function (err, connection) {
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
            address: 'Москва, проспект Улиц, 5',
            latitude: 55.8342421,
            longitude: 37.2396415
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
            address: 'Москва, проспект Таганский, 5',
            latitude: 54.8342054021,
            longitude: 33.239006415
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

    it("get place by id", function (done) {

        placeService.getPlace(placeId, function (err, result) {
            expect(err).to.equal(null, "error should equal NULL");
            expect(result[0].id).to.equal(placeId, "result[0].id should equal " + placeId);
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

    it("get all places after deleting of one", function (done) {
        placeService.getAllPlaces(function (err, places) {
            expect(err).to.equal(null, "error should equal NULL");
            places.should.be.a('array');
            places.should.have.length(1, "array has to have 1 element");
            done();
        });
    });
});
