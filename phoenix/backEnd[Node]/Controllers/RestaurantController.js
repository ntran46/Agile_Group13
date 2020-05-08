const Restaurant     = require('../Models/Restaurant');
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const RestaurantRepo       = require('../Data/RestaurantRepo');
const _RestaurantRepo      = new RestaurantRepo();


exports.Index = async function(request, response){
    let restaurants = await _RestaurantRepo.allRestaurant();
    if(restaurants!= null) {
        response.json({restaurants:restaurants});
    }
    else {
        response.json({restaurants:[]});
    }
};

// Displays registration form.
exports.Register = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render('Restaurant/Register', {errorMessage:"", restaurant:{}, reqInfo:reqInfo})
};

// Handles 'POST' with registration form submission.
exports.RegisterRestaurant  = async function(req, res){
   
    // Creates Restaurant object with mongoose model.
    var newRestaurant = new Restaurant({
        email    :  req.body.email,
        restaurantName:  req.body.restaurantName,
        strAddress     :  req.body.strAddress,
        city     :  req.body.city,
        zipcode  :  req.body.zipcode,
        phoneNo  :  req.body.phoneNo,
        description  :  req.body.description,
        license  :  req.body.license,
        menu     :  req.body.menu,
        branchLocation :  req.body.branchLocation,
        employees:  req.body.employees,
    });
    
    /// Call Repo to save 'Restaurant' object.
    let responseObject = await _RestaurantRepo.create(newRestaurant);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        res.json({ restaurant:responseObject.obj,
                                            errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item is not created.");
        res.json( {
            restaurant:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
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
