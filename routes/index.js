var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socialmediaDB',{useMongoClient:true});
require('../models/Users');
var User = mongoose.model('User');

// name, profileImg, bgColor (6 digit hexadecimal value), interests
// var users = [
// {
// 	name: "Bob", 
// 	profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGgfEcu0eBLQZBhs_COrSRa_F4uixbP0dRCB33_o245ig6tLhb", 
// 	bgColor: "#FF0000", 
// 	interests: "Likes bananas."
// },
// {
// 	name: "Joe",
// 	bgColor: "#3221cb",
// 	profileImg: "https://i.pinimg.com/736x/2f/19/b4/2f19b4848cec494453329da720de4f99--funny-monkey-pictures-funny-pics.jpg",
// 	interests: "Can be a little angry sometimes."
// },
// {
// 	name: "Jimmy",
// 	bgColor: "#51ad36",
// 	profileImg: "https://i.pinimg.com/736x/2f/65/84/2f6584501154698b43853b9f16a68030--great-comebacks-amazing-comebacks.jpg",
// 	interests: "Does a pretty swell job."
// }];
// router.get('/', function(req, res, next) {
//   res.sendFile('index.html', { root: 'public' });
// });
router.param('user', function(req, res, next, id) {
  	var query = User.findById(id);
  	query.exec(function (err, user){
	    if (err) { return next(err); }
	    if (!user) { return next(new Error("can't find user")); }
	    req.user = user;
	    return next();
  	});
});

router.get('/getusers', function(req, res) {
	// return a JSON object list of users
	User.find(function(err, users) {
		if(err){ return next(err); }
    	res.json(users);
	});
});

router.post('/getusers', function(req, res) {
	// req object will have form: {name(string), profileImg(string URL), bgColor(string), interests(string) }
	var user = new User(req.body);
  	user.save(function(err, user){
	    if(err){ return next(err); }
	    res.json(user);
  	});
});

router.put('/getusers/:user/post', function(req, res, next) {
	req.user.newPost(req.body, function(err, user){
	    if (err) { return next(err); }
	    res.json(user);
  	});
})

router.delete('/getusers/:user', function(req, res) {
  	req.user.remove();
  	res.sendStatus(200);
});

module.exports = router;
