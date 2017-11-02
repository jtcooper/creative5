var express = require('express');
var router = express.Router();


// name, profileImg, bgColor (6 digit hexadecimal value), interests
var users = [{name: "Bob", profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGgfEcu0eBLQZBhs_COrSRa_F4uixbP0dRCB33_o245ig6tLhb", bgColor: "FF0000", interests: "likes bananas"}];
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html', { root: 'public' });
});

router.get('/getusers', function(req, res) {
	// return a JSON object list of users
	console.log(users);
	res.send(users);
});

router.post('/getusers', function(req, res) {
	// req object will have form: {name(string), profileImg(string URL), bgColor(string), interests(string) }
	var newUser = req.body;
	users.push(newUser);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;
