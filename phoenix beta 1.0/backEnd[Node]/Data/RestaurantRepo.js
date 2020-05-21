const Restaurant = require('../Models/Restaurant');

class RestaurantRepo {
    RestaurantRepo() {        
    }

    async allRestaurant() {     
        let restaurants = await Restaurant.find().exec();
        return restaurants;
    }

    async getEmployees() {
        var employees = await Restaurant.find().exec();
        if(employees) {
            return employees;
        }
        else {
            return [];
        }
    }    

    async getRestaurantByID(id) {
        var restaurant = await Restaurant.findOne({_id: id});
        if(restaurant) {
            let respose = { obj: restaurant, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getRestaurantByEmail(email) {
        var restaurant = await Restaurant.findOne({email: email});
        if(restaurant) {
            let respose = { obj: restaurant, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getRestaurantByLicence(license) {
        var restaurant = await Restaurant.findOne({license: license});
        if(restaurant) {
            let respose = { obj: restaurant, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getRestaurantByPhone(phone) {
        var restaurant = await Restaurant.findOne({phoneNo: phone});
        if(restaurant) {
            let respose = { obj: restaurant, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }


    async create(RestaurantObj) {
        try {
            var error = await RestaurantObj.validateSync();
    
            if(error) {
                let response = {
                    obj:          RestaurantObj,
                    errorMessage: error.message };

                return response;
            } 
            const result = await RestaurantObj.save();
            let response = {
                obj:          result,
                errorMessage: "" };

            return response;
        } 

        catch (err) {
            let response = {
                obj:          RestaurantObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 

    async updateItem(editedObj) { 

        let response = {
            obj:          editedObj,
            errorMessage: "" };
    
        try {
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            let RestaurantObj = await this.getRestaurantByID(editedObj._id);
            if(RestaurantObj) {
                let updated = await Restaurant.updateOne(
                    { _id: editedObj._id},
                    {$set: { isApproved: editedObj.isApproved }}); 
    
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                else {
                    respons.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
            else {
                response.errorMessage = "No item with this id cannot be found." };
                return response; 
            }

        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  

    async getMyReview(userName){
        
        var myReview  = [];
        var userObj   = await Restaurant.find({"comments.username": userName});

        for(const item of userObj){
            for(var i=0; i<item.comments.length; i++){
                if(item.comments[i].username == userName){
                    var tempvalues = [item._id, item.restaurantName];
                    let userReviewtemp = Object.values(item.comments[i].userReview);
                    tempvalues.push(userReviewtemp);
                    myReview.push(tempvalues);
                }
            }
        }
        return myReview;
    }    

    async checkMyReview(response, userName){

        var MyReviews  = await this.getMyReview(userName);
        for(var k=0, j=0; k<MyReviews.length; k++){
            if(MyReviews[k][j].equals(response.obj._id)){
                response.errorMessage= "You already wrote a review for this Restaurant: " + response.obj.restaurantName;
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
            console.log(editedObj._id)
            let RESObject = await this.getRestaurantByEmail(editedObj.email);

            if(RESObject) {
                if (action=="Edit"){
                    var updated = await Restaurant.updateOne(
                        { email: editedObj.email},
                        {$set: {'comments.username':editedObj.comments.username}}
                    ) 
                }
                else if (action =="Create"){
                    let responseObject = await this.checkMyReview(response, userName);
                    if(responseObject.errorMessage !=""){
                        return responseObject;
                    }else{
                        var updated = await Restaurant.updateOne(
                            { email: editedObj.email},
                            {$push: {comments:editedObj.comments}}
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
    
    async delete(email) {
        console.log("Restaurant to be deleted has the email: " + email);
        let deletedRest =  await Restaurant.find({email:email}).remove().exec();
        console.log(deletedRest);
        return deletedRest;
    }
}
module.exports = RestaurantRepo;

