"use strict";

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    async = require('async'),
    handleQuery = require('../../src/utils').handleQuery;

describe("DB -> Users suites -> ", function () {
    var pool = require('../../src/db-pool'),
        userService = require('../../src/services/users'),
        user,
        userId,
        password = "qweqweqwe5",
        i = 0;

    it("delete all users", function (done) {

        async.waterfall(
            [
                pool.getConnection,
                deleteUserDetails,
                deleteUserLocation,
                deleteUser
            ],
            function (err, conn) {
                conn.release();
                if (err) {
                    console.log(err);
                    return done();
                }
                return done();
            }
        );

        function deleteUserDetails(conn, callback) {
            conn.query("DELETE FROM user_details WHERE id > 0", handleQuery(conn, callback));
        }

        function deleteUserLocation(conn, callback) {
            conn.query("DELETE FROM location WHERE user_id > 0", handleQuery(conn, callback));
        }

        function deleteUser(conn, callback) {
            conn.query("DELETE FROM user WHERE id > 0", handleQuery(conn, callback));
        }
    });

    it("save first user", function (done) {

        user = {
            username: 'user' + i,
            password: password,
            email: 'email@mail' + i + '.ru'
        };

        userService.createUser(user, function (err) {
            expect(err).to.equal(null);
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

        userService.createUser(user, function (err, result) {
            expect(err).to.equal(null);
            userId = result.id;
            done();
        });
    });

    it("save third user", function (done) {
        var username = 'user0';
        user = {
            username: username,
            password: password,
            email: 'email@mail' + i + '.ru'
        };

        userService.createUser(user, function (err, result) {
            expect(err).not.to.equal(null);
            done();
        });
    });

    it("get user by username", function (done) {
        userService.getUser({
            username: user.username
        }, function (err, users) {
            should.exist(users);
            users.should.be.a('array');
            users.length.should.not.equal(0);
            users[0].username.should.equal(user.username);
            done();
        });
    });

    it("update user.network_status", function (done) {
        var newNetworkStatus;

        userService.getUser({
            username: user.username
        }, function (err, users) {
            users.should.be.a('array');
            users.length.should.not.equal(0);
            users[0].username.should.equal(user.username);
            newNetworkStatus = users[0].network_status === 0 ? 1 : 0;

            userService.setNetworkStatus({
                networkStatus: newNetworkStatus,
                username: user.username
            }, function (err, result) {
                expect(err).to.equal(null);

                userService.getUser({
                    username: user.username
                }, function (err, users) {
                    expect(err).to.equal(null);
                    users.should.be.a('array');
                    users.length.should.not.equal(0);
                    users[0].username.should.equal(user.username);
                    assert.equal(users[0].network_status, newNetworkStatus);

                    done();
                });
            });
        });
    });

    it('delete user', function (done) {
        userService.deleteUser(userId, function (err, result) {
            expect(err).to.equal(null);
            done();
        });
    });

});
