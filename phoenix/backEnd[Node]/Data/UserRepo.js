const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async allUsers() {     
        let users = await User.find().exec();
        return users;
    }

    async getUser(username) {
        var user = await User.findOne({username: username});
        if(user) {
            let respose = { obj: user, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getRolesByUsername(username) {
        var user = await User.findOne({username: username}, {_id:0, roles:1});
        if(user.roles) {
            return user.roles;
        }
        else {
            return [];
        }
    } 
    
    async getUserByEmail(email) {
        var user = await User.findOne({email: email});
        if(user) {
            let respose = { obj: user, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async update(editedObj, action) {   
    
        let response = {
            obj:          editedObj,
            errorMessage: "" };
    
        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            // Load the actual corresponding object in the database.
            let UserObject = await this.getUser(editedObj.username);
    
            // Check if the record exists.
            if(UserObject) {
                // record exists so update it.
                if (action == "Update"){
                    var updated = await User.updateOne(
                        { username: editedObj.username},
                        {$set: {firstName:editedObj.firstName,
                                lastName:editedObj.lastName,
                                email:editedObj.email,
                                address:editedObj.address,
                                zipcode:editedObj.zipcode,
                                txtEmpPhone:editedObj.txtEmpPhone}})
                    
                }
                else if (action == "Remove"){
                    var updated = await User.updateOne(
                        { username: editedObj.username},
                        // Set new attribute values here.
                        // {$set: { attendee: editedObj.attendee }}
                        ); 
                }
    
                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {response.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
            else {response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
                    // An error occurred during the update. 
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  

    async delete(email) {
        console.log("Id to be deleted is: " + email);
        let deletedItem =  await User.find({email:email}).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }
}
module.exports = UserRepo;

