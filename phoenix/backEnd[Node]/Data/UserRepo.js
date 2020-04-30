const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async allUsers() {     
        let users = await User.find().exec();
        return users;
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

    async getRolesByEmail(email) {
        var user = await User.findOne({email: email}, {_id:0, roles:1});
        if(user.roles) {
            return user.roles;
        }
        else {
            return [];
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
}
module.exports = UserRepo;

