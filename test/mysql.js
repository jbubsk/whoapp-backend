var request = require('supertest'),
    chai    = require('chai'),
    expect  = chai.expect,
    should  = chai.should();

describe("DB suites -> ", function () {
    var userService = require('../src/services/user'),
        user,
        password = "qweqweqwe5";

    describe("\nUser suites ->", function () {
        var i = 0,
            userCounter = 4;

        it("save first user", function (done) {

            user = {
                username : 'user' + i,
                password : password,
                email    : 'email@mail' + i + '.ru'
            };

            userService.createUser(user, function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                i++;
                done();
            });
        });

        it("save second user", function (done) {

            user = {
                username : 'user' + i,
                password : password,
                email    : 'email@mail' + i + '.ru'
            };

            userService.createUser(user, function (err) {
                expect(err).to.equal(null, "error should equal NULL");
                done();
            });
        });


        it("get user by username", function (done) {
            userService.getUser({username : user.username}, function (err, user) {
                should.exist(user, 'user should exist');
                user.username.should.equal(user.username);
                done();
            });
        });

        it("delete all users", function (done) {
            var pool = require('../src/db_pool');

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
    });
});
