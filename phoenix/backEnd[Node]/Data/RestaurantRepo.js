const Restaurant = require('../Models/Restaurant');

class RestaurantRepo {
    RestaurantRepo() {        
    }

    async allRestaurant() {     
        let restaurants = await Restaurant.find().exec();
        return restaurants;
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
    
            let RestaurantObj = await this.getRestaurantByEmail(editedObj.email);
            if(RestaurantObj) {
    
                let updated = await Restaurant.updateOne(
                    { _id: editedObj.id},
                    {$set: {  }}); 
    
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
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }

        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  
    
    async delete(email) {
        console.log("Email to be deleted is: " + email);
        let deletedItem =  await Restaurant.find({email:email}).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }

    async getUserByUsername(username) {
        var user = await Restaurant.findOne({username: username}, {_id:0, roles:1});
        if(user) {
            return user;
        }
        else {
            return [];
        }
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
}
module.exports = RestaurantRepo;

