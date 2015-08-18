var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
require('express-helpers')(app);
var request = require('request');
var results = require('./models/4square.json')
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var NODE_ENV = process.env.NODE_ENV || 'development';
var BASE_URL = (NODE_ENV === 'production') ? 'https://something.herokuapps.com' : 'http://localhost:3000';
var db = require("./models");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
// OAUTH
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//store user in session
passport.serializeUser(function(user,done){
  done(null, user.id);
});
//retrieve user from session
passport.deserializeUser(function(id,done){
  db.user.findById(id).then(function(user){
    done(null, user.get());
  }).catch(done);
});
//
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: BASE_URL + '/auth/callback/facebook',
  profileFields: ['email','displayName']
},function(accessToken, refreshToken, profile, done){
  db.provider.find({
    where:{
      pid:profile.id,
      type:profile.provider
    },
    include:[db.user]
  }).then(function(provider){
    if(provider && provider.user){
      //login
      provider.token = accessToken;
      provider.save().then(function(){
        done(null,provider.user.get());
      });
    }else{
      //signup
      // console.log(profile);
      var email = profile.emails[0].value;
      db.user.findOrCreate({
        where:{email:email},
        defaults:{email:email,name:profile.displayName}
      }).spread(function(user,created){
        if(created){
          //user was created
          user.createProvider({
            pid:profile.id,
            token:accessToken,
            type:profile.provider
          }).then(function(){
            done(null,user.get());
          })
        }else{
          //signup failed
          done(null,false,{message:'You already signed up with this e-mail address. Please login.'})
        }
      });
    }
  });
}));


passport.use(new LocalStrategy({
    usernameField:'email'
  },
  function(email,password,done){
    email = 'tester1@gmail.com';
    password = 'testtest';
    db.user.find({where:{email:email}}).then(function(user){
      if(user){
        //found the user
        currentUser = user
        user.checkPassword(password,function(err,result){
          if(err) return done(err);
          if(result){
            // currentUser = true;
            //good password
            done(null,user.get());
          }else{
            //bad password
            // currentUser = false;
            done(null,false,{message: 'Invalid Password.'});
          }
        });
      }else{
        //didn't find the user
        done(null,false,{message: 'Unknown user. Please sign up.'});
      }
    });
  }
));

// END OAUTH

app.use(function(req,res,next){
  res.locals.currentUser = req.session.user;
  res.locals.alerts = req.flash();
  next();
});


app.use('/dates', require('./controllers/dates.js'));
app.use('/auth',require('./controllers/auth.js'));
app.set("layout extractScripts", true);
app.use(express.static(__dirname + '/assets'));
//////////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.render('main/index');
});

app.get('/about', function(req, res){
  res.render('main/about');
});


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
app.get('/search', function(req,res) {
  res.render('search');
});

app.get('/results', function(req,res) {
  var fourSquareId = process.env.FOURSQUARE_ID;
  var fourSquareSecret = process.env.FOURSQUARE_SECRET;
  var seattle = '47.6097,-122.3331';

  var url = ("https://api.foursquare.com/v2/venues/search?client_id=" +
   fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20130815" +
   "&ll=" + seattle +
  "&query=" + req.query.what);

  request(url, function(error, response, data) {
    console.log(url);
    res.send(data);
  });
});

// Populate the eventful results
app.get('/eventsResults', function(req,res) {
    var eventfulId = process.env.EVENTFUL_ID;
    var seattle = '47.6097,-122.3331';
    var radius =  25;
    var keywords = req.query.keywords;

    var url = ("http://api.eventful.com/json/events/search?app_key=" + eventfulId +
"&where=" + seattle + "&within=" + radius + "&keywords=" + keywords)

    request(url, function(error, response, data) {
        res.render('eventsResults', {data:JSON.parse(data)});
    });

})

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, function(){
  console.log("You're lisening to the smooth sounds of Port 3000")
});
