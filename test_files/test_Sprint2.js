// Import the dependencies for testing
let mongoose = require("mongoose");
let User = require('../Models/User');
let Restaurant = require('../Models/Restaurant');
var chai = require('chai')
var chaiHttp = require('chai-http');
var app = require('../app.js');
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

// Valid user object - same username as `userObject`
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

// Valid user object - same email as `userObject`
userObject3 = {
    'username': 'MT',
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

// Valid user object - same phone number as `restObject`
restObject1 = {
    'restaurantName': 'yelpTest',
    'email': 'yelpme@protal.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(604) 434-5734',
    'zipcode': 'V6B 3H6',
    'license': 'KHSRT_87DR4TE',
    'description': 'Please register me again',
}

// Valid user object - same licence as `restObject`
restObject2 = {
    'restaurantName': 'yelpTest',
    'email': 'yelp@protal.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(775) 400-7845',
    'zipcode': 'V6B 3H6',
    'license': 'MTUR_34GYHDS',
    'description': 'Please register me again',

}

// Valid user object - same email as `restObject`
restObject3 = {
    'restaurantName': 'yelpTest',
    'email': 'yelp@my.protal.ca',
    'city': 'vancouver',
    'strAddress': '555 Seymour St',
    'phoneNo': '(775) 400-7845',
    'zipcode': 'V6B 3H6',
    'license': 'MISP_74GTUYE',
    'description': 'Please register me again',

}


describe("Register Normal Users", () => {
    describe("/POST user - Register", () => {

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

        it("2) Should not create a user with an in-use username.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject2)
                .end((err, res) => {
                    expect(res.body.errorMessage.name).to.equal('UserExistsError')
                    done();
                });
        });

        it("3) Should not create a new user with an in-use email address.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject3)
                .end((err, res) => {
                    // expect(res.status).to.equal(200)
                    expect(res.body.errorMessage.name).to.equal('MongoError')
                    done();
                });
        });

        it("4) Should not create a new user with an invalid password (not at least 8 character && no upper case).", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject4)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Must contain at least 1 number, 1 uppercase, 1 lowercase letter, 1 special character, and at least 8 or more characters.")
                    done();
                });
        });

        it("5) Should not create a new user with an invalid password (no number && no symbol).", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject5)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Must contain at least 1 number, 1 uppercase, 1 lowercase letter, 1 special character, and at least 8 or more characters.")
                    done();
                });
        });

        it("6) Should not create a new user when password doesn't match the confirm password.", (done) => {
            chai.request(app)
                .post(`/User/RegisterUser`)
                .send(userObject6)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("Passwords do not match.")
                    done();
                });
        });


    });
});


describe('Users - Login', () => {
    before((done) => {
        chai.request(app)
            .post(`/User/RegisterUser`)
            .send(userObject)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                done();
            });
    });
    describe("Login Normal Users", () => {

        describe("/POST user - Login", () => {

            it("1) Test a POST request to create a new user.", (done) => {
                chai.request(app)
                    .post(`/User/LoginUser`)
                    .send(userObject1)
                    .end((err, res) => {
                        expect(res.status).to.equal(200)
                        console.log(res.body)
                        done();
                    });
            });
        });
    });
});

describe("Register Restaurant", () => {
    describe("/POST restaurant - Register", () => {

        it("1) Test a POST request to create a new restaurant.", (done) => {
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

            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(restObject)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).not.to.be.empty;
                    expect(res.body.restaurant).to.have.property('phoneNo', '(604) 434-5734')
                    // expect(res.body.user).to.have.property('license', 'MTUR_34GYHDS')
                    done();
                });
        });

        it("2) Should not create a restaurant with an in-use phone number.", (done) => {
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(restObject1)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal('A similar licence exists.')
                    done();
                });
        });

        it("3) Should not create a new restaurant with an in-use licence.", (done) => {
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(restObject2)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal('A similar licence exists.')
                    done();
                });
        });

        it("4) Should not create a new restaurant with an in-use email.", (done) => {
            chai.request(app)
                .post(`/Restaurant/RegisterRestaurant`)
                .send(userObject3)
                .end((err, res) => {
                    expect(res.body.errorMessage).to.equal("A similar licence exists.")
                    done();
                });
        });

    });
});

