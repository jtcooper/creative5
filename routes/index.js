var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

//OPEN A CONNECTION

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/pokemon';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    
    /**
     * TODO: insert data here, once we've successfully connected
     */
  }
});



// name, profileImg, bgColor (6 digit hexadecimal value), interests
var users = [
{
	name: "Bob", 
	profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGgfEcu0eBLQZBhs_COrSRa_F4uixbP0dRCB33_o245ig6tLhb", 
	bgColor: "#FF0000", 
	interests: "Likes bananas."
},
{
	name: "Joe",
	bgColor: "#3221cb",
	profileImg: "https://i.pinimg.com/736x/2f/19/b4/2f19b4848cec494453329da720de4f99--funny-monkey-pictures-funny-pics.jpg",
	interests: "Can be a little angry sometimes."
},
{
	name: "Jimmy",
	bgColor: "#51ad36",
	profileImg: "https://i.pinimg.com/736x/2f/65/84/2f6584501154698b43853b9f16a68030--great-comebacks-amazing-comebacks.jpg",
	interests: "Does a pretty swell job."
}];
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
	users.push(newUser);
	res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;
