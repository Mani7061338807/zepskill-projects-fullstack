const mongoose = require('mongoose');
const passportLocal = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
       type:Boolean,
       default:false
    },
    name: String,
	cgpa: Number,
	selected: {
		type: Boolean,
		default: false
	}

});
userSchema.plugin(passportLocal, { usernameField: 'username' });
let User = mongoose.model('user', userSchema);
module.exports = User;