var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name: String,
	profileImg: String,
	bgColor: String,
	interests: String,
	posts: [{ 
		body: String, 
		date: {type: Date, default: Date.now } 
	}]
});
UserSchema.methods.newPost = function(body, cb) {
  this.posts.push(body);
  this.save(cb);
};
mongoose.model('User', UserSchema);