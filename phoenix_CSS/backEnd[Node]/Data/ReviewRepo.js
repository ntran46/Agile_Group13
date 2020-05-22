const Review = require('../Models/Restaurant');

class ReviewRepo {
    
    // This is the constructor.
    ReviewRepo() {        
    }

    // Gets all Movies.
    async allMovies() {     
        let movies = await Review.find().exec();
        return movies;
    }

    async getMyReview(userName){
        
        var myReview  = [];
        var userObj   = await Review.find({"commemts.username": userName});

        for(const movie of userObj){

            for(var i=0; i<movie.commemts.length; i++){
                if(movie.commemts[i].username == userName){
                    var tempvalues = [movie._id, movie.movieName];
                    let userReviewtemp = Object.values(movie.commemts[i].userReview);
                    tempvalues.push(userReviewtemp);
                    myReview.push(tempvalues);
                }
            }
        }
        return myReview;
    }       

    async getMovie(id) {  
        let movie = await Review.findOne({_id:id}).exec();
        return   movie;
    }
  
    async checkMyReview(response, userName){

        var MyReviews  = await this.getMyReview(userName);
        for(var k=0, j=0; k<MyReviews.length; k++){
            if(MyReviews[k][j] == response.obj._id ){
                response.errorMessage= "You already wrote a review for this movie: " + response.obj.movieName;
                return response;
            }
        }
        response.errorMessage= "";
        return response;
    }

    async updateReview(editedObj,userName,action) {   
    
        // Set up response object which contains original object and empty error message.
        let response = {
            obj         : editedObj,
            errorMessage: "" };

        try {
            // Load the actual corresponding object in the database.
            let movieObject = await this.getMovie(editedObj._id);

            // Check if this movie exists.
            if(movieObject) {
                if (action=="Edit"){
                    var updated = await Review.updateOne(
                        { _id: editedObj._id}, // Match id.
                        {$set: {'commemts.username':editedObj.commemts.username}}
                    ) 
                }
                else if (action =="Create"){
                    let responseObject = await this.checkMyReview(response, userName);
                    if(responseObject.errorMessage !=""){
                        return responseObject;
                    }else{
                        var updated = await Movie.updateOne(
                            { _id: editedObj._id}, // Match id.
                            {$push: {commemts:editedObj.commemts}}
                        );
                    }
                }  
                // No errors during update.
                if(updated.nModified!=0) {      
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
                            
            // Movie Name not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
    
        // An error occurred during the update. 
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  

    async delete(id, username) {
        let errorMessage = "";  

        try {
            var deletedItem =  await Review.updateOne(
                        // Match movie ID and the username who wrote that review
                        {_id:id, 'commemts.username':username},

                        // Remove the entity
                        {$pull: {'commemts':{username:username}}}
                        
                        );

            return deletedItem, errorMessage ;
        }
        catch (err) {
            errorMessage = err.message;
            return  errorMessage;
        }  
    }

}
module.exports = ReviewRepo;
