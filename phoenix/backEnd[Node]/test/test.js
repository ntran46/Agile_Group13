// Import the dependencies for testing
var mongoose            = require("mongoose");
var mongodb             = mongoose.connection;
var Schema              = mongoose.Schema;
process.env.NODE_ENV    = 'test';

let User                = require('../Models/User');
let Restaurant          = require('../Models/Restaurant');
const RestaurantRepo    = require('../Data/RestaurantRepo');
const _RestaurantRepo   = new RestaurantRepo();
var chai                = require('chai')
var chaiHttp            = require('chai-http');
var app                 = require('../app.js');
const { expect, assert } = chai

// Configure chai
chai.use(chaiHttp);
chai.should();

// Valid user object
userObject = {
    'username': 'test',
    'firstname': 'test',
    'lastname': 'testing',
    'email': 'test@bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// Valid user object
userObject1 = {
    'username': 'bcit.ca',
    'firstname': 'bcit',
    'lastname': 'school',
    'email': 'bcit@bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// InValid user object - same username as `userObject`
userObject2 = {
    'username': 'bcit.ca',
    'firstname': 'testing',
    'lastname': 'tested',
    'email': 'tested@bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// InValid user object - same email as `userObject`
userObject3 = {
    'username': 'MTaer',
    'firstname': 'maryam',
    'lastname': 'taer',
    'email': 'bcit@bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// Invalid user object - password invalid (not at least 8 character && no upper case)
userObject4 = {
    'username': 'bcit',
    'firstname': 'bcit',
    'lastname': 'school',
    'email': 'bcit@my.bcit.ca',
    'password': 'pasw0rd',
    'passwordConfirm': 'pasw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// Invalid user object - password invalid (no number && no symbol)
userObject5 = {
    'username': 'bcit',
    'firstname': 'bcit',
    'lastname': 'school',
    'email': 'bcit@my.bcit.ca',
    'password': 'Password',
    'passwordConfirm': 'Password',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// Invalid user object - password != passwordConfirm
userObject6 = {
    'username': 'bcit',
    'firstname': 'bcit',
    'lastname': 'school',
    'email': 'bcit@my.bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rdron',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// valid user object
userObject7 = {
    'username': 'MarT',
    'firstname': 'bcit',
    'lastname': 'school',
    'email': 'mtaer@my.bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// Invalid user Object - username less than 4 characters
userObject8 = {
    'username': 'Mar',
    'firstname': 'bcit',
    'lastname': 'school',
    'email': 'mtaer@my.bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

// Invalid user Object - Invalid phone number format
userObject9 = {
    'username': 'MarTin',
    'firstname': 'Maryam',
    'lastname': 'Taer',
    'email': 'mttaer@my.bcit.ca',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '6044345734'
}

// Invalid user Object - Invalid emailformat
userObject10 = {
    'username': 'MarTini',
    'firstname': 'Maryam',
    'lastname': 'Taer',
    'email': 'mttaer@my',
    'password': 'P@ssw0rd',
    'passwordConfirm': 'P@ssw0rd',
    'gender': 'Female',
    'address': '555 Seymour St, Vancouver, BC',
    'zipcode': 'V6B 3H6',
    'txtEmpPhone': '(604) 434-5734'
}

//--------------------------------------------------------------------------------------------------------------------------------------

// valid restaurant object
restObject = {
    'restaurantName': 'yelp',
    'email': 'yelp@my.protal.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(604) 434-5734',
    'zipcode': 'V6B 3H6',
    'license': 'MTUR_34GYHDS',
    'description': 'Please register me',
}

// valid restaurant object
restObject1 = {
    'restaurantName': 'yelpTest',
    'email': 'yelpme@hotmail.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(604) 300-2398',
    'zipcode': 'V6B 3H6',
    'license': 'HISADF_36WER',
    'description': 'Please register me again',
}

restObject5 = {
    'restaurantName': 'yelp',
    'email': 'yelp123@you.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(238) 402-1209',
    'zipcode': 'V6B 3H6',
    'license': 'OASDHU_SDF56S',
    'description': 'Please register me',
}

// InValid user object - same phone number as `restObject`
restObject2 = {
    'restaurantName': 'yelp',
    'email': 'yelp@my.protal.com',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(604) 434-5734',
    'zipcode': 'V6B 3H6',
    'license': 'WTERFVG_UAYDGE45',
    'description': 'Please register me',
}

// InValid user object - same licence as `restObject`
restObject3 = {
    'restaurantName': 'yelpTest',
    'email': 'yelp@protal.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(775) 400-7845',
    'zipcode': 'V6B 3H6',
    'license': 'MTUR_34GYHDS',
    'description': 'Please register me again',

}

// InValid user object - same email as `restObject`
restObject4 = {
    'restaurantName': 'yelpTest',
    'email': 'yelp@my.protal.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(604) 167-1200',
    'zipcode': 'V6B 3H6',
    'license': 'MISP_74GTUYE',
    'description': 'Please register me again',

}
//-------------------------------------------------------------------------------------------------------------------------------------

describe("Normal Users - Register", () => {
    before((done) => {
        chai.request(app)
            .post(`/User/RegisterUser`)
            .send(userObject)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.Message).to.equal('Registered successfully');
                done();
            });
    });

    after((done) => {
        mongodb.db.dropCollection("users", function(err, result) { console.log(result); }); 
        // User.removeAllListeners({"address": "555 Seymour St, Vancouver, BC"}, function(err, result) { console.log(result); })
        done();
    });


    describe("[POST] user - Register", () => {

        it("1) Test a POST request to create a new user.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject1)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).not.to.be.empty;
                    expect(res.body.user).to.have.property('username', 'bcit.ca')
                    expect(res.body.user).to.have.property('email', 'bcit@bcit.ca')
                    done();
                });
        });

        it("2) Test a GET request to receive a user object.", (done) => {
            chai.request(app)
                .get(`/User/Index`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.users).to.not.be.null;
                    done();
                });
        });


        it("3) Should not create a user with an in-use username.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject2)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.not.be.null;
                    expect(res.body.errorMessage.name).to.equal('UserExistsError')
                    done();
                });
        });

        it("4) Should not create a new user with an in-use email address.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject3)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.errorMessage).to.not.be.null;
                    done();
                });
        });

        it("5) Should not create a new user with an invalid pass [< 8 character & no upper case]", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject4)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Must contain at least 1 number, 1 uppercase, 1 lowercase letter, 1 special character, and at least 8 or more characters.")
                    done();
                });
        });

        it("6) Should not create a new user with an invalid pass [no number && no symbol]", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject5)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Must contain at least 1 number, 1 uppercase, 1 lowercase letter, 1 special character, and at least 8 or more characters.")
                    done();
                });
        });

        it("7) Should not create a new user when pass doesn't match the confirm pass.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject6)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Passwords do not match.")
                    done();
                });
        });

        it("8) Should not create a new user with an invalid username [less than 4 characters]", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject8)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Username must be at least 4 character.")
                    done();
                });
        });

        it("9) Should not create a new user with an invalid phone number [Invalid format]", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject9)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Please enter a valid phone number (e.g. (123) 456-7890, 123-456-7890, 123 456 7890, +91 (123) 456-7890.")
                    done();
                });
        });

        it("10) Should not create a new user with an invalid email [Invalid format]", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject10)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Please enter a valid email (joe@aol.com, joe@wrox.co.uk, joe@domain.info).")
                    done();
                    console.log()
                    console.log("------------------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------------------")
                });
        });

    });
});

//-------------------------------------------------------------------------------------------------------------------------------------

describe('Users - Login', () => {
    before((done) => {
        chai.request(app)
            .post(`/User/RegisterUser`)
            .send(userObject1)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                done();
            });
    });

    after((done) => {
        mongodb.db.dropCollection("users", function(err, result) { console.log(result); }); 
        done();
    });


    describe("[POST, GET] Normal User - Login", () => {

        it("1) Test a POST request to login with an existing user.", (done) => {
            objectTemp = { "username": "bcit.ca", "password": "P@ssw0rd" }
            chai.request(app)
                .post(`/auth`)
                .send(objectTemp)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    if (res.body.token) {
                        console.log("User logged in")
                    }
                    else {
                        console.log("Dennied access")
                    }
                    done();
                });
        });

        it("2) Test a POST request to login with an non-existing user.", (done) => {
            objectTemp = { "username": "bcit.ca.com", "password": "P@ssw0rd" }
            chai.request(app)
                .post(`/auth`)
                .send(objectTemp)
                .end((err, res) => {
                    expect(res.status).to.equal(401)
                    console.log(res.text)
                    done();
                    console.log()
                    console.log("------------------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------------------")
                });
        });
    });
});

// //-------------------------------------------------------------------------------------------------------------------------------------

describe("Restaurant - Register", () => {
    before((done) => {
        chai.request(app)
            .post(`/Restaurant/RegisterRestaurant`)
            .send(restObject)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.errorMessage).to.equal('');
                expect(res.body.Message).to.equal('Saved without errors.')
                done();
            });
    });

    after((done) => {
        mongodb.db.dropCollection("restaurants", function(err, result) { console.log(result); });
        // Restaurant.findOneAndDelete({$or: [{"restaurantName": "yelpTest"}, {"restaurantName": "yelp"}]}).exec()
        done();
    });

    describe("/POST restaurant - Register", () => {

        it("1) Test a POST request to create a new restaurant.", (done) => {
            // valid restaurant object
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(restObject1)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.restaurant).to.have.property('phoneNo', '(604) 300-2398');
                    expect(res.body.restaurant).to.have.property('license', 'HISADF_36WER');
                    expect(res.body.restaurant).to.have.property('email', 'yelpme@hotmail.ca');
                    done();
                });
        });

        it("2) Should not create a restaurant with an in-use phone number.", (done) => {
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(restObject2)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.not.be.null;
                    done();
                });
        });

        it("3) Should not create a new restaurant with an in-use licence.", (done) => {
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(restObject3)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.not.be.null;
                    expect(res.body.errorMessage).to.equal('A similar licence exists.')
                    done();
                });
        });

        it("4) Should not create a new restaurant with an in-use email.", (done) => {
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(userObject4)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.errorMessage).to.not.be.null;
                    done();
                    console.log()
                    console.log("------------------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------------------")
                });
        });

    });
});

// //-------------------------------------------------------------------------------------------------------------------------------------

describe('Reviews - Details of a Review - [Successful]', () => {

    before((done) => {
        chai.request(app)
            .post(`/Restaurant/RegisterRestaurant`)
            .send(restObject5)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.restaurant).to.have.property('phoneNo', '(238) 402-1209');
                expect(res.body.restaurant).to.have.property('license', 'OASDHU_SDF56S');
                expect(res.body.restaurant).to.have.property('email', 'yelp123@you.ca');
                done();
            });
    });

    before((done) => {
        chai.request(app)
            .post(`/User/RegisterUser`)
            .send(userObject7)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.Message).to.equal('Registered successfully');
                expect(res.body.errorMessage).to.equal('');
                done();
            });
    });

    before((done) => {
        chai.request(app)
            .post(`/User/RegisterUser`)
            .send(userObject1)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.Message).to.equal('Registered successfully');
                expect(res.body.errorMessage).to.equal('');
                done();
            });
    });

    before((done) => {
        objectTemp = { "username": "MarT", "password": "P@ssw0rd" }
        chai.request(app)
            .post(`/auth`)
            .send(objectTemp)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                if (res.body.token) {
                    console.log("User logged in")
                }
                else {
                    console.log("Dennied access")
                }
                done();
            });

            
        });
        
    after((done) => {
    mongodb.db.dropCollection("users", function(err, result) { console.log(result); });
    mongodb.db.dropCollection("restaurants", function(err, result) { console.log(result); });
    done();
    });

    describe("[POST] Review - [ Successful ]", () => {
        it("1) Test a POST request to create a review.", (done) => {
            let reviewObj = { "username": "test", "review": "The meal was great!", "rating": "5", "license": "OASDHU_SDF56S" }

            chai.request(app)
                .post(`/Restaurant/WriteReviews`)
                .send(reviewObj)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.errorMessage).to.equal('');
                    expect(res.body.Message).to.equal('Review saved Successfully.')
                    done();
                });
        });
    });

    describe("[GET] Review - [ Successful ]", () => {
        it("2) Test a GET request to receive details on a review for a restaurant.", (done) => {
            chai.request(app)
                .get(`/Restaurant/ReviewDetail?license=OASDHU_SDF56S`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.comments).to.be.a('array')
                    expect(res.body.comments).to.not.be.null;
                    expect(res.body.errorMessage).to.equal('');
                    done();
                });
        });
    });

    describe("[POST] Review - [ Fail ]", () => {
        it("3) Should not create another review with the same user.", (done) => {
            let reviewObj = { "username": "test", "review": "Not bad", "rating": "3", "license": "OASDHU_SDF56S" }

            chai.request(app)
                .post(`/Restaurant/WriteReviews`)
                .send(reviewObj)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.errorMessage).to.equal('You already wrote a review for this Restaurant: yelp');
                    expect(res.body.Message).to.equal('An error occured! Review did not save.')
                    done();
                });
        });
    });

    describe("[POST] Review - [ Fail ]", () => {
        it("4) Should not create another review with invalid rating (Not integer).", (done) => {
            let reviewObj1 = { "username": "bcit.ca", "review": "Great restaurant!", "rating": "ten", "license": "OASDHU_SDF56S" }

            chai.request(app)
                .post(`/Restaurant/WriteReviews`)
                .send(reviewObj1)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.errorMessage).to.equal("Cannot read rating of type 'String'!");
                    expect(res.body.Message).to.equal('Please enter a number between 0-10.')
                    done();
                });
        });
    });

    describe("[POST] Review - [ Fail ]", () => {
        it("5) Should not create another review with invalid rating (Out of range).", (done) => {
            let reviewObj1 = { "username": "bcit.ca", "review": "Great restaurant!", "rating": "11", "license": "OASDHU_SDF56S" }

            chai.request(app)
                .post(`/Restaurant/WriteReviews`)
                .send(reviewObj1)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.errorMessage).to.equal("Cannot read rating of type 'String'!");
                    expect(res.body.Message).to.equal('Please enter a number between 0-10.')
                    done();
                    console.log()
                    console.log("------------------------------------------------------------------------------------")
                    console.log("------------------------------------------------------------------------------------")
                });
        });
    });
});