const Restaurant     = require('../Models/Restaurant');
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const RestaurantRepo       = require('../Data/RestaurantRepo');
const _RestaurantRepo      = new RestaurantRepo();


exports.Update = async function(request, response){

    let tempReviewObj  = new Restaurant( {
        _id       : request.body._id,
        email     : request.body.email,
        isApproved: request.body.isApproved
    });

    let restaurant = await _RestaurantRepo.updateItem(tempReviewObj);
    if(restaurant!= null) {
        response.json({restaurant:restaurant});
    }
    else {
        response.json({restaurant:[]});
    }
};

// Displays registration form.
exports.Register = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render('Restaurant/Register', {errorMessage:"", restaurant:{}, reqInfo:reqInfo})
};

exports.WriteReviews = async function(request, response) {
    let RestaurantID = request.body._id;
    let RESObj     = await _RestaurantRepo.getRestaurantByID(RestaurantID);
   
    let reqInfo    = RequestService.reqHelper(request);
    let username   = request.body.username;
    let rating     = request.body.rating;
    let review     = request.body.review;

    let tempReviewObj = createTempObj(RESObj, username,rating,review);
    let responseObject = await _RestaurantRepo.updateReview(tempReviewObj, username,"Create");
    let myReviews      = await _RestaurantRepo.getMyReview(username);

    if(responseObject.errorMessage == "") {
        response.json({
            restaurant  : myReviews,
            errorMessage: "" ,
            reqInfo     : reqInfo
        });
    }

    else {
        response.json({ 
            restaurant  : myReviews,
            errorMessage: responseObject.errorMessage,
            reqInfo     : reqInfo });
    }
}

exports.Index = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let RESObj  = await _RestaurantRepo.allRestaurant();

    let restaurants   = [];

    for(var key=0; key<RESObj.length; key++){
        let total        = 0;
        let countStars   = 0;
        let countReview  = 0;
        if ((RESObj[key].comments)){
            for(var i=0; i<RESObj[key].comments.length; i++){
                countStars = countStars +1; 
                if (RESObj[key].comments[i].userReview.rating !=(null,"", undefined)){
                    total = total + parseInt(RESObj[key].comments[i].userReview.rating,10);
                };
                if (RESObj[key].comments[i].userReview.review !=(null, "",undefined)){
                    countReview = countReview + 1;
                };     
            }    
           
        }
        if (total != 0){
            restaurants.push([RESObj[key], (total/countStars).toFixed(1), countReview]);
            // restaurants.push([RESObj[key]._id, RESObj[key].restaurantName, (total/countStars).toFixed(1), countReview]);
        }
        else{
            restaurants.push([RESObj[key], total, countReview]);
            // restaurants.push([RESObj[key]._id, RESObj[key].restaurantName, total, countReview]);
        }  
        
        
    } 
    return res.json( { reqInfo:reqInfo, restaurants:restaurants });
};

exports.ReviewDetail = async function(request, response) {
    let RestaurantID = request.query._id; 
    let reqInfo      = RequestService.reqHelper(request);
    let RESObj       = await _RestaurantRepo.getRestaurantByID(RestaurantID);

    var objArray = [];
    if (RESObj.obj.comments){
        for(var i=0; i<RESObj.obj.comments.length; i++){
            var userkey = RESObj.obj.comments[i].username;
            objArray.push([userkey, RESObj.obj.comments[i].userReview.rating, 
                                    RESObj.obj.comments[i].userReview.review, 
                                    RESObj.obj.comments[i].userReview.date]);
        }
    }
    response.json({restaurant:RESObj, comments:objArray, errorMessage: "",reqInfo:reqInfo});
}

// Handles 'POST' with registration form submission.
exports.RegisterRestaurant = async function (req, res) {
    let license = await _RestaurantRepo.getRestaurantByLicence(req.body.license);
    if (license == null) {

        // Creates Restaurant object with mongoose model.
        var newRestaurant = new Restaurant({
            email: req.body.email,
            restaurantName: req.body.restaurantName,
            strAddress: req.body.strAddress,
            city: req.body.city,
            zipcode: req.body.zipcode,
            phoneNo: req.body.phoneNo,
            description: req.body.description,
            license: req.body.license,
            menu: req.body.menu,
            branchLocation: req.body.branchLocation,
            employees: req.body.employees,
        });

        /// Call Repo to save 'Restaurant' object.
        let responseObject = await _RestaurantRepo.create(newRestaurant);

        // No errors so save is successful.
        if (responseObject.errorMessage == "") {
            res.json({
                restaurant: responseObject.obj,
                Message: "Saved without errors.",
                errorMessage: ""
            });
        }

        // There are errors. Show form the again with an error message.
        else {
            res.json({
                restaurant: responseObject.obj,
                errorMessage: responseObject.errorMessage,
                Message: "An error occured. Item not created."
            });
        }
    }
    else {
        res.json({
            restaurant: newRestaurant,
            errorMessage: "A similar licence exists.",
        });
    }

};

exports.Delete = async function(request, response) {
    let email           = request.body.email;
    let deletedItem  = await _RestaurantRepo.delete(email);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let restaurants     = await _RestaurantRepo.allRestaurant();
    response.json( {restaurants:restaurants});
}

// Shows login form.
exports.Login = async function(req, res) {
    let reqInfo      = RequestService.reqHelper(req);
    let errorMessage = req.query.errorMessage; 

    res.render('Restaurant/Login', { Restaurant:{}, errorMessage:errorMessage, 
                               reqInfo:reqInfo});
}

exports.LoginUser = async function(req, res, next) {
    let roles   = await _RestaurantRepo.getUserByUsername(req.body.username);
    sessionData = req.session;
    sessionData.roles  = roles;
  
    passport.authenticate('local', {
        successRedirect : '/Restaurant/SecureArea', 
        failureRedirect : '/Restaurant/Login?errorMessage=Invalid login.', 
    }) (req, res, next);
  };
  

// Log user out and direct them to the login screen.
exports.Logout = (req, res) => {
    req.logout();
    let reqInfo = RequestService.reqHelper(req);

    res.render('Restaurant/Login', { Restaurant:{}, isLoggedIn:false, errorMessage : "", 
                               reqInfo:reqInfo});
};


// This displays a view called 'securearea' but only 
// if user is authenticated.
exports.SecureArea  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {
        res.render('Restaurant/SecureArea', {errorMessage:"", reqInfo:reqInfo})
    }
    else {
        res.redirect('/Restaurant/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}

// This displays a view called 'securearea' but only 
// if user is authenticated.
exports.ManagerArea  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req, ['Admin', 'Manager']);

    if(reqInfo.rolePermitted) {
        res.render('User/ManagerArea', {errorMessage:"", reqInfo:reqInfo})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in with proper permissions to view this page.')
    }
}

// This function returns data to authenticated users only.
exports.SecureAreaJwt  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req);

    if(reqInfo.authenticated) {
        res.json({errorMessage:"", reqInfo:reqInfo,
            secureData: "Congratulations! You are authenticated and you have "
                +  "successfully accessed this message."})
    }
    else {
        res.json( {errorMessage:'/User/Login?errorMessage=You ' +
                'must be logged in to view this page.'})
    }
}

// This function returns data to logged in managers only.
exports.ManagerAreaJwt  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, ['Admin', 'Manager']);

    if(reqInfo.rolePermitted) {
        res.json({errorMessage:"", reqInfo:reqInfo})
    }
    else {
        res.json({errorMessage:'You must be logged in with proper ' +
                'permissions to view this page.'});
    }
}

// This function receives a post from logged in users only.
exports.PostAreaJwt = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    console.log(req.body.obj.msgFromClient);
    res.json({errorMessage:"", reqInfo:reqInfo,
        msgFromServer:"Hi from server"})
};

function getCurrentDate(){
    let currentDate = new Date();
    let day   = currentDate.getDate();
    let month = currentDate.getMonth();
    let year  = currentDate.getFullYear();
    var MON =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if (day < 10) {
        day = '0' + day.toString();
      } 
    let formatted_date = day.toString() + "-" + MON[month] + "-" + year.toString()
    let formatted_date1 = day.toString() + "-" + MON[month] + "-" + year.toString()

    return formatted_date.slice(-100,-2);
}

function createTempObj(RESObj, loginName, rating, review){
    let date       = getCurrentDate();
    let userReview = {rating:rating,review:review, date:date};
    let userObject = {username: loginName, userReview};

    let tempReviewObj  = new Restaurant({
        _id       : RESObj.obj._id,
        restaurantName  : RESObj.obj.restaurantName,
        email     : RESObj.obj.email,
        comments  : userObject
    });

    return tempReviewObj;
}
