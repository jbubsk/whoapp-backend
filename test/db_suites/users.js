var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe("DB -> Users suites -> ", function () {
    var pool = require('../../src/db_pool'),
        userService = require('../../src/services/user'),
        user,
        password = "qweqweqwe5",
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
