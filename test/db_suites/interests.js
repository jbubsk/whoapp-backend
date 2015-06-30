'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    logger = require('../../src/logger-winston');

describe('DB -> Interests suites -> ', function () {
    var pool = require('../../src/db-pool'),
        interestService = require('../../src/services/interests'),
        name = 'Drink',
        interestId;

    it('delete all interests', function (done) {

        pool.getConnection(function (err, connection) {
            connection.query('DELETE FROM interest WHERE id > 0', function (err) {
                expect(err).to.equal(null, 'error should equal NULL');
                done();
            });
        });
    });

    it('add first interest', function (done) {
        interestService.add(name, function (err, result) {
            expect(err).to.equal(null);
            expect(result).to.be.a('number');
            interestId = result;
            done();
        });
    });

    it('update first interest', function (done) {
        name = 'new name';
        interestService.update({id: interestId, name: name}, function (err) {
            expect(err).to.equal(null, 'error should equal NULL');

            interestService.getById(interestId, function (err, result) {
                expect(err).to.equal(null);
                expect(result).to.be.a('array');
            });
            done();
        });
    });

    it('add second interest', function (done) {

        interestService.add(name + '2', function (err, result) {
            expect(err).to.equal(null, 'error should equal NULL');
            expect(result).not.to.equal(null, 'interestId should not equal NULL');
            interestId = result;
            done();
        });
    });

    it('get all interests', function (done) {

        interestService.getAll(function (err, interests) {
            expect(err).to.equal(null, 'error should equal NULL');
            interests.should.be.a('array');
            interests.should.have.length(2);
            done();
        });
    });

    it('delete interest by id', function (done) {

        interestService.remove(interestId, function (err, result) {
            expect(err).to.equal(null);
            done();
        });
    });

    it('get interest by name', function (done) {

        interestService.getByName(name, function (err, interest) {
            expect(err).to.equal(null, 'error should equal NULL');
            interest.should.be.a('array');
            interest.should.have.length(1);
            expect(name).to.equal(interest[0].name);
            done();
        });
    });


});
