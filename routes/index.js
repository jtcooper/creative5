var express = require('express');
var router = express.Router();


// id, name, profileImg, bgColor (6 digit hexadecimal value), interests
var users = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html', { root: 'public' });
});

router.get('/getusers', function(req, res) {
	// return a JSON object list of users
	res.send(users);
});

router.post('/getusers', function(req, res) {
	// req object will have form: {name(string), profileImg(string URL), bgColor(string), interests(string) }
	var newUser = req.body;
	newUser.id = users.length;
	users.push(newUser);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;
