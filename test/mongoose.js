var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    logger = require('../src/logger-winston'),
    common = require('../src/common'),
    should = chai.should();


describe("DB suites -> ", function () {
    var application = require('../application'),
        periodService = require('../src/services/periods'),
        budgetService = require('../src/services/budget'),
        categoryService = require('../src/services/category'),
        User = require('../src/models/user'),
        Budget = require('../src/models/budget'),
        Category = require('../src/models/category'),
        user,
        userId_1,
        userId_2;

    after(function () {
        application.disconnectDB();
    });

    before(function () {
        var instance = application.instanceDB(),
            connection;

        if (instance) {
            connection = instance.connections ? instance.connections[0] : null;
            if (!connection || connection.name !== 'enod-test') {
                application.connectDB();
            } else {
                logger.info("It's already connected to DB");
            }
        } else {
            logger.info("Connection isn't found.");
        }
    });

    describe("\nUser suites ->", function () {
        var i = 0,
            userCounter = 2;

        it("save " + userCounter + " users", function (done) {

            function run(user, done) {
                user.save(function (err) {
                    expect(err).to.equal(null, "error should equal NULL");
                    if (done) {
                        userId_2 = user._id.toString();
                        done();
                    } else {
                        userId_1 = user._id.toString();
                    }
                });
            }

            for (i; i < 2; i++) {
                user = new User({
                    username: 'Nikolya' + i,
                    password: 'Nikolya5raz',
                    email: 'emmail@mail.ru'
                });

                if (i === 0) {
                    run(user);
                }
                if (i === 1) {
                    run(user, done);
                }

            }
        });


        it("retrieve user by username", function (done) {
            User.findOne({username: user.username}, function (err, user) {
                should.exist(user, 'user should exist');
                user.username.should.equal(user.username);
                done();
            });
        });
    });

    describe("\nBudget suites ->", function () {
        var items = 10,
            budgetForDeletion,
            months = [
                '2/23/2014',
                '4/23/2013',

                '4/23/2013',
                '4/23/2013',

                '5/23/2015',
                '5/23/2015',
                '5/23/2015',

                '6/23/2015',
                '6/23/2015',
                '6/23/2015'
            ];

        it("save budget", function (done) {
            var i = 0,
                budgetDoc;

            for (i; i < items; i++) {
                budgetDoc = {};
                budgetDoc.category = 'someCategory' + i;
                budgetDoc.name = '345r' + i;
                budgetDoc.date = new Date(months[i]).getTime();
                budgetDoc.amount = i;
                budgetDoc._creator = i > 7 ? userId_2 : userId_1;

                budgetService.addBudget(budgetDoc, function (err, result) {
                    expect(err).to.equal(null, 'error should equal NULL');
                    should.exist(result._creator, "'_creator' field should exist");
                    budgetForDeletion = result;
                });
            }
            done();
        });

        it("update budgetDoc name", function (done) {
            var budgetId;

            budgetService.getBudgetList({
                name: '345r5',
                userId: userId_1
            }, function (err, result) {
                expect(err).to.equal(null, "error should equal NULL");
                expect(result).to.be.instanceOf(Array);
                expect(result).to.have.length(1);
                expect(result[0].items).to.have.length(1);
                budgetId = result[0].items[0]._id.toString();

                budgetService.updateBudget({
                    budgetId: budgetId,
                    name: 'coco'
                }, function (err, result) {
                    expect(err).to.equal(null, "error should equal NULL");
                    expect(result).to.be.equals(1);

                    budgetService.getBudgetList({
                        name: 'coco'
                    }, function (err, result) {
                        expect(err).to.equal(null, "error should equal NULL");
                        expect(result).to.be.instanceOf(Array);
                        expect(result).to.have.length(1);
                        done();
                    });
                });
            });

        });

        it("retrieve budget list by month and year", function (done) {
            budgetService.getBudgetList({
                month: 5,
                year: 2015,
                userId: userId_2
            }, function (err, result) {
                expect(err).to.equal(null, "error should equal NULL");
                expect(result).to.be.instanceOf(Array);
                expect(result).to.have.length(1, "budget list should be 1 item length");
                expect(result[0].items.length).to.equal(2, "should be 2 items for periods");
                done();
            });
        });

        it("retrieve one budget and user's name from budget document", function (done) {
            Budget.findOne({'_creator.name': user.name})
                .populate('_creator')
                .exec(function (err, bud) {
                    expect(err).to.equal(null, "error should equal NULL");
                    should.exist(bud, "budget should exist");
                    console.log(bud);
                    expect(bud).to.not.instanceOf(Array);
                    expect(bud._creator.name).to.equal(user.name, "should equal '" + user.name + "'");
                    done();
                });
        });

        it("retrieve years, month af all existing budgets", function (done) {
            Budget.find()
                .exec(function (err, budgets) {
                    expect(err).to.equal(null, "error should equal NULL");
                    should.exist(budgets, "budgets should exist");
                    budgets.forEach(function (item, index) {
                        expect(item.year).to.be.within(2013, 2015);
                    });
                    done();
                });
        });

        it("retrieve distinct years from all existing budgets", function (done) {
            Budget.distinct('year')
                .exec(function (err, years) {
                    expect(err).to.equal(null, "error should equal NULL");
                    should.exist(years, "budgets should exist");
                    expect(years).to.include(2013, "years should include 2013");
                    expect(years).to.include(2015, "years should include 2015");
                    done();
                });
        });

        it("retrieve periods set for user1", function (done) {
            periodService.getPeriods(userId_1, function (err, result) {
                logger.info(result);
                expect(err).to.equal(null, "error should equal NULL");
                expect(result).to.be.length(4);
                done();
            });
        });

        it("retrieve periods set for user2 - should differ from user1", function (done) {
            periodService.getPeriods(userId_2, function (err, result) {
                expect(err).to.equal(null, "error should equal NULL");
                expect(result).to.be.length(1);
                expect(!!result['2016']).to.be.equal(false);
                done();
            });
        });

        it("remove budget", function (done) {
            Budget.find(function (err, result) {
                console.info('number of budgets is: ' + result.length + '\n');

                budgetService.removeById(budgetForDeletion._id.toString(), function (err, result) {
                    expect(err).to.equal(null, 'error should equal NULL');

                    Budget.find(function (err, result) {
                        expect(result.length).to.equal(items - 1, 'error should equal NULL');
                        done();
                    });
                });
            });
        });

    });

    describe("\nCategory suites ->", function () {
        it("save one category", function (done) {
            function addCategory(name) {
                categoryService.addCategory({
                    name: name,
                    description: 'it is category for ' + name
                }, function (err, categoriy) {
                    expect(err).to.equal(null, "error should equal NULL");
                    should.exist(categoriy, 'category should exist');
                    if(name === 'secondCat'){
                        done();
                    }
                });
            }

            addCategory('firstCat');

            addCategory('secondCat');
        });

        it("retrieve all categories", function (done) {
            categoryService.getCategories(function (err, categories) {
                expect(err).to.equal(null, "error should equal NULL");
                expect(categories).to.instanceOf(Array);
                expect(categories).to.have.length(2);
                console.info(categories);
                done();
            });
        });
    });

    describe("\nRemove all documents ->", function () {

        it("remove all users", function (done) {
            User.remove(function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    done();
                }
            });
        });

        it("remove all budgets", function (done) {
            Budget.remove(function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    done();
                }
            });
        });

        it("remove all categories", function (done) {
            Category.remove(function (err, result) {
                if (err) {
                    logger.error(err);
                } else {
                    done();
                }
            });
        });
    });
});