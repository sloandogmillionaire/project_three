var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
require('express-helpers')(app);
var request = require('request');
var results = require('./models/4square.json')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
// app.use(express.static('assets'));

// GET foursquare search page (this is home page)
app.get('/', function(req, res) {
  // parameters are differientiated in foursquare with an &
  console.log(results);
  res.render('search');
});


// pass in form query and hit foursquare api then pass in variables and
// render results view of all foursquare objects
app.get('/search', function(req,res) {
  var fourSquareId = process.env.FOURSQUARE_ID;
  var fourSquareSecret = process.env.FOURSQUARE_SECRET;
  var seattle = '47.6097,-122.3331';
  var what = req.query.what;

  var url = ("https://api.foursquare.com/v2/venues/search?client_id=" +
   fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20130815" +
   "&ll=" + seattle +
  "&query=" + what);

  request(url, function(error, response, data) {
    // res.send(JSON.parse(data));
    res.render('results', { results: JSON.parse(data) });
    });
});

// Get eventful search page
app.get('/2', function(req, res) {
   res.render('search2');
});


// Pass in form query and hit eventful API and then pass in variables
// render results view of all foursquare objects
app.get('/search2', function(req,res) {
    res.send('This will be full of eventbrite responses soon!');
})



// app.get('results')
app.listen(process.env.PORT || 3000);
