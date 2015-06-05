var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB suites -> ", function () {
    var pool = require('../src/db_pool'),
        user,
        password = "qweqweqwe5";

    describe("\nUser suites ->", function () {
        var userService = require('../src/services/user'),
            i = 0;


        it("delete all users", function (done) {

            pool.getConnection(
                function (connection) {
                    connection.query("DELETE FROM user_details WHERE id > 0", function (err, result) {
                        if (!err) {
                            connection.query("DELETE FROM user WHERE id > 0", function (err, result) {
                                if (!err) {
                                    done();
                                }
                            });
                        }
                    });
                },
                function (err) {
                    console.log(err);
                    done();
                });
        });

        it("save first user", function (done) {

            user = {
                username: 'user' + i,
                password: password,
                email: 'email@mail' + i + '.ru'
            };

            userService.createUser(user, function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                i++;
                done();
            });
        });

        it("save second user", function (done) {

            user = {
                username: 'user' + i,
                password: password,
                email: 'email@mail' + i + '.ru'
            };

            userService.createUser(user, function (err) {
                expect(err).to.equal(null, "error should equal null");
                done();
            });
        });

        it("get user by username", function (done) {
            userService.getUser({
                username: user.username
            }, function (err, user) {
                should.exist(user, 'user should exist');
                user.username.should.equal(user.username);
                done();
            });
        });

        it("update user.network_status", function (done) {
            var newNetworkStatus;

            userService.getUser({
                username: user.username
            }, function (err, user) {
                newNetworkStatus = user.network_status === 0 ? 1 : 0;

                userService.setNetworkStatus({
                    network_status: newNetworkStatus,
                    username: user.username
                }, function (err, result) {
                    expect(err).to.equal(null, "error should equal NULL");
                    expect(result).to.equal("network status is updated");

                    userService.getUser({
                        username: user.username
                    }, function (err, user) {
                        expect(err).to.equal(null, "error should equal NULL");
                        assert.equal(user.network_status, newNetworkStatus);

                        done();
                    });
                });
            });
        });
    });

    describe("\nInterest suites ->", function () {
        var interestService = require('../src/services/interest'),
            name = 'Drink';

        it("delete all interests", function (done) {

            pool.getConnection(function (connection) {
                connection.query("DELETE FROM interest WHERE id > 0", function (err) {
                    expect(err).to.equal(null, "error should equal NULL");
                    done();
                });
            })
        });

        it("add first interest", function (done) {

            interestService.addInterest(name, function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                done();
            });
        });

        it("add second interest", function (done) {

            interestService.addInterest(name + '2', function (err) {
                expect(err).to.equal(null, "error should equal NULL");
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

        it("get interest by name", function (done) {

            interestService.getInterestByName(name, function (err, interest) {
                expect(err).to.equal(null, "error should equal NULL");
                expect(name).to.equal(interest.name, "interest.name should equal " + name);
                done();
            });
        });

    });

    describe("\nPlaces suites ->", function () {
        var placeService = require('../src/services/place'),
            name = 'Drink';

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
                name   : 'Лучшее место',
                city: 'Москва',
                city_id: 13658,
                address: 'Москва, проспект Улиц, 5'
            }, function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                done();
            });
        });

        it("add second place", function (done) {

            placeService.addPlace({
                name   : 'Не Лучшее место',
                city: 'Москва',
                city_id: 13658,
                address: 'Москва, проспект Таганский, 5'
            }, function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                done();
            });
        });

        it("get all places", function(done) {

            placeService.getAllPlaces(function(err, places) {
                expect(err).to.equal(null, "error should equal NULL");
                places.should.be.a('array');
                places.should.have.length(2);
                done();
            });
        });

        //it("get interest by name", function(done) {
        //
        //    interestService.getInterestByName(name, function(err, interest) {
        //        expect(err).to.equal(null, "error should equal NULL");
        //        expect(name).to.equal(interest.name, "interest.name should equal " + name);
        //        done();
        //    });
        //});

    });

    describe("\n\tCity suites", function () {
        var cityService = require('../src/services/cities');

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
});
