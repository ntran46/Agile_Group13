const ReviewRepo      = require('../Data/ReviewRepo');
const _reviewRepo     = new ReviewRepo();
const Review          = require('../Models/Review');
const RequestService  = require('../Services/RequestService');


exports.ReviewDetail = async function(request, response) {
    // request.query used to get url parameter.
    let RestaurantID  = request.query._id; 
    let reqInfo  = RequestService.reqHelper(request);
    let movieObj = await _reviewRepo.getMovie(MovieID);

    // Convert movieObj to a nested array
    var objArray = [];
    if (movieObj.commemts){
        for(var i=0; i<movieObj.commemts.length; i++){
            var userkey     = movieObj.commemts[i].username;
            objArray.push([userkey, movieObj.commemts[i].userReview.rating, 
                                    movieObj.commemts[i].userReview.review, 
                                    movieObj.commemts[i].userReview.date]);
        }
    }

    response.render('Movie/ReviewDetail', {movies:movieObj, commemts:objArray, errorMessage: "",reqInfo:reqInfo});
}

exports.MyReviews = async function(request, response) {
    // request.query used to get url parameter.
    let reqInfo    = RequestService.reqHelper(request);

    if(reqInfo.authenticated) {      
        let MyReviews  = await _reviewRepo.getMyReview(reqInfo.username);  
        response.render('Movie/MyReviews', {movies:MyReviews, errorMessage: "" , reqInfo:reqInfo})
    }
    else {
        response.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}

exports.WriteReviews = async function(request, response){
    let MovieID  = request.query._id; 
    let reqInfo  = RequestService.reqHelper(request);

    if(reqInfo.authenticated) {
        let movieObj = await _reviewRepo.getMovie(MovieID);
        response.render('Movie/WriteReviews', {movies:movieObj, reqInfo:reqInfo, commemts: "", username:reqInfo.username, review:"", rating:""})
    }
    else {
        response.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to write a review.')
    }
   
};

exports.EditMyReview = async function(request, response){
    let reqInfo  = RequestService.reqHelper(request);
    let MovieID  = request.body._id;
    let movieObj = await _reviewRepo.getMovie(MovieID);
    response.render('Movie/EditMyReview', {
        movies:movieObj, 
        reqInfo:reqInfo, 
        commemts: "", 
        username:reqInfo.username, 
        review:"", rating:""});
}

exports.UpdateMyReview = async function(request, response){
    let reqInfo    = RequestService.reqHelper(request);
    let MovieID    = request.body._id;
    let movieObj   = await _reviewRepo.getMovie(MovieID);
    let loginName  = request.user.username;
    let rating     = request.body.rating;
    let review     = request.body.review;
    
    let tempReviewObj = createTempObj(movieObj,loginName,rating,review);

    // Call update() function in repository with the object.
    let responseObject = await _reviewRepo.updateReview(tempReviewObj, loginName, "Edit");
    let myReviews      = await _reviewRepo.getMyReview(reqInfo.username);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        response.render('Movie/MyReviews', {
            movies      : myReviews,
            errorMessage: "" ,
            reqInfo     : reqInfo
        });
    }

    // Update not successful. Show edit form again.
    else {
        response.render('Movie/MyReviews', { 
            movies      : myReviews,
            errorMessage: responseObject.errorMessage,
            reqInfo     : reqInfo });
    }
}
 
// Receives posted data that is used to update the item.
exports.CreateReview = async function(request, response) {
    let MovieID    = request.body._id;
    let movieObj   = await _reviewRepo.getMovie(MovieID);
   
    let reqInfo    = RequestService.reqHelper(request);
    let loginName  = request.user.username;
    let rating     = request.body.rating;
    let review     = request.body.review;

    let tempReviewObj = createTempObj(movieObj, loginName,rating,review);

    // Call updateReview function in repository with the object.
    let responseObject = await _reviewRepo.updateReview(tempReviewObj, loginName,"Create");

    // Call getMyReview function in repository with the object.
    let myReviews      = await _reviewRepo.getMyReview(reqInfo.username);

    // Update was successful. Show the MyReviews page with updated object.
    if(responseObject.errorMessage == "") {
        response.render('Movie/MyReviews', {
            movies      : myReviews,
            errorMessage: "" ,
            reqInfo     : reqInfo
        });
    }

    // Update not successful. Show the MyReviews page again.
    else {
        response.render('Movie/MyReviews', { 
            movies      : myReviews,
            errorMessage: responseObject.errorMessage,
            reqInfo     : reqInfo });
    }
}

// This function receives an id when it is posted. 
// It then performs the delete and shows the review listing after.
exports.DeleteReview = async function(request, response) {
    let id           = request.body._id;
    let username     = request.user.username;
    let reqInfo      = RequestService.reqHelper(request);

    let deletedItem, errorMessage   = await _reviewRepo.delete(id,username);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let movies    = await _reviewRepo.getMyReview(username);
    if(errorMessage == "") { 
        response.render('Movie/MyReviews', {movies:movies, errorMessage:errorMessage,reqInfo: reqInfo});
    }
    else{
        response.render('Movie/MyReviews', {movies:movies, errorMessage:errorMessage,reqInfo: reqInfo});
    }
}

function getCurrentDate(){
    let currentDate = new Date();
    let day   = currentDate.getDate();
    let month = currentDate.getMonth();
    let year  = currentDate.getFullYear();
    var MON =["Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"];
    if (day < 10) {
        day = '0' + day.toString();
      } 
    let formatted_date = day.toString() + "-" + MON[month-1] + "-" + year.toString()
    let formatted_date1 = day.toString() + "-" + MON[month-1] + "-" + year.toString()

    return formatted_date.slice(-100,-2);
}

function createTempObj(movieObj, loginName, rating, review){
    let date       = getCurrentDate();
    let userReview = {rating:rating,review:review, date:date};
    let userObject = {username: loginName, userReview};

    // Parcel up data in a 'Movie' object.
    let tempReviewObj  = new Movie( {
        _id        : movieObj._id,
        movieName  : movieObj.movieName,
        commemts   : userObject
    });

    return tempReviewObj;
}
