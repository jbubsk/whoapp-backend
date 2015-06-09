var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB -> Interests suites -> ", function () {
    var pool = require('../../src/db_pool'),
        interestService = require('../../src/services/interest'),
        name = 'Drink',
        insertId;

    it("delete all interests", function (done) {

        pool.getConnection(function (connection) {
            connection.query("DELETE FROM interest WHERE id > 0", function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                done();
            });
        })
    });

    it("add first interest", function (done) {

        interestService.addItem(name, function (err) {
            expect(err).to.equal(null, "error should equal NULL");
            done();
        });
    });

    it("add second interest", function (done) {

        interestService.addItem(name + '2', function (err, result) {
            expect(err).to.equal(null, "error should equal NULL");
            expect(result.id).not.to.equal(null, "insertId should not equal NULL");
            insertId = result.id;
            done();
        });
    });

    it("get all interests", function (done) {

        interestService.getAllInterests(function (err, interests) {
            expect(err).to.equal(null, "error should equal NULL");
            interests.should.be.a('array');
            interests.should.have.length(2);
            done();
        });
    });

    it("delete interest by id", function (done) {

        interestService.deleteItem(insertId, function (err, result) {
            expect(err).to.equal(null, "error should equal NULL");
            console.log(result);
            done();
        });
    });

    it("get interest by name", function (done) {

        interestService.getInterestByName(name, function (err, interest) {
            expect(err).to.equal(null, "error should equal NULL");
            expect(name).to.equal(interest.name, "interest.name should equal " + name);
            done();
        });
    });


});
