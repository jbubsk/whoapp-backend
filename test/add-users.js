var assert = require('assert'),
	chai = require('chai'),
	expect = chai.expect,
	should = chai.should();

describe("\nUser suites ->", function () {
	var userService = require('../src/services/user'),
		password = 'eqewffff',
		user,
		i = 0;

	it("add user", function (done) {

		user = {
			username: 'valera',
			password: 'valera',
			email: 'valera@mail.ru'
		};

		userService.createUser(user, function (err) {
			expect(err).to.equal(null, "error should equal NULL");
			i++;
			done();
		});
	});

	/*it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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

	it("add user", function (done) {

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
	});*/

});
