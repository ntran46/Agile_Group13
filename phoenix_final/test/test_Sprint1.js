// // Import the dependencies for testing
// var chai     = require('chai')
// var chaiHttp = require('chai-http');
// var app      = require('../app.js');

// // Configure chai.
// chai.use(chaiHttp);
// chai.should();

// describe("Agile Project - Group 13", () => {
//     describe("Unit test in 1st Sprint", () => {         
//         // Describe test.
//         it("Test 1 - get user Object returned by API.", (done) => {
//             chai.request(app)
//                 .get(`/User/Index`)
//                 .end((err, res) => {
//                     console.log("------------------------------")
//                     res.should.have.status(200); 
//                     res.body.should.be.a('object');

//                     // Extract 'user' info from API response.
//                     let userObj = res.body.users;
//                     var userList = []
//                     for (var i=0; i < userObj.length; i++){
//                         userList.push(userObj[i].username)
//                     }
//                     console.log()
//                     console.log("Extract list of users from API response.")
//                     console.log(userList);    
//                     console.log()
//                     done();
//                 });
//          });

//          it("Test 2 - find a user info from API.", (done) => {
//             chai.request(app)
//                 .get(`/User/Index`)
//                 .end((err, res) => {
//                     console.log()
//                     res.should.have.status(200); 
//                     res.body.should.be.a('object');
  
//                     // Extract 'user' info from API response.
//                     let userObj = res.body.users;
//                     let userFinding = 'test'
//                     var user = []

//                     for (var i=0; i < userObj.length; i++){
//                         if (userObj[i].username === userFinding ){
//                             user.push(userObj[i])
//                         }
//                     }
//                     console.log()
//                     console.log("Find a user from the user list extracted from API response.")
//                     if (user.length != 0){
//                         console.log(user);    
//                     }else{
//                         console.log("User " + userFinding + " does not exist")
//                     }
//                     console.log()
//                     done();
//                 });
//         });

//         // Perform a POST test.
//         it("Test 3 - send a POST request to create a new user.", (done) => {
//             userObject = {'username': 'bcit', 'firstName': 'bcit', 'lastName':'school',
//                           'email': 'bcit@bcit.ca', 'password' : 'P@ssw0rd', 'passwordConfirm' : 'P@ssw0rd',
//                           'gender' : 'Female', 'address':'555 Seymour St, Vancouver, BC' , 
//                           'zipcode' : 'V6B 3H6', 'txtEmpPhone' : '(604) 434-5734'}

//             chai.request(app)
//                 .post(`/User/RegisterUser`) 
//                 .send(userObject)
//                 .end((err, res) => {
//                     res.should.have.status(200); 
//                     console.log()
//                     console.log("Showing output.")
//                     if (res.body.Message != undefined){
//                         console.log(res.body.Message)
//                         let user = res.body.user.username;
//                         user.should.equal('bcit');
//                         console.log(res.body.user)
//                     }else{
//                         console.log(res.body.user.errorMessage)
//                     }
//                     console.log()
//                     done();
//                 });
//          });

//         // Perform a POST test.
//         it("Test 4 - send a POST request to create a user with same username.", (done) => {
//             userObject = {'username': 'bcit', 'firstname': 'bcit', 'lastname':'school',
//                           'email': 'bcit@bcit.ca', 'password' : 'P@ssw0rd', 'passwordConfirm' : 'P@ssw0rd',
//                           'gender' : 'Female', 'address':'555 Seymour St, Vancouver, BC' , 
//                           'zipcode' : 'V6B 3H6', 'txtEmpPhone' : '(604) 434-5734'}

//             chai.request(app)
//                 .post(`/User/RegisterUser`) 
//                 .send(userObject)
//                 .end((err, res) => {
//                     console.log()
//                     console.log("Showing output.")
//                     if (res.body.Message != undefined){
//                         console.log(res.body.Message)
//                         let user = res.body.user.username;
//                         user.should.equal('bcit');
//                         console.log(res.body.user)
//                     }else{
//                         console.log(res.body.errorMessage)
//                     }
//                     console.log()
//                     done();    
//                 });
//         });

//         // Perform a POST test.
//         it("Test 5 - send a POST request to create a new user with same email address.", (done) => {
//             userObject = {'username': 'bcit_burnaby', 'firstName': 'bcit', 'lastName':'school',
//                             'email': 'bcit@bcit.ca', 'password' : 'P@ssw0rd', 'passwordConfirm' : 'P@ssw0rd',
//                             'gender' : 'Female', 'address':'555 Seymour St, Vancouver, BC' , 
//                             'zipcode' : 'V6B 3H6', 'txtEmpPhone' : '(604) 434-5734'}

//             chai.request(app)
//                 .post(`/User/RegisterUser`) 
//                 .send(userObject)
//                 .end((err, res) => {
//                     res.should.have.status(200); 
//                     console.log()
//                     console.log("Showing output.")
//                     if (res.body.Message != undefined){
//                         console.log(res.body.Message)
//                         let user = res.body.user.username;
//                         user.should.equal('bcit');
//                         console.log(res.body.user)
//                     }else{
//                         console.log(res.body.errorMessage)
//                     }
//                     console.log("------------------------------")
//                     done();
//                 });
//         });
//     });
// });
