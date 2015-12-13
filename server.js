var express =require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , session = require('express-session')
  , FacebookStrategy = require('passport-facebook')
  , passport = require('passport')
  , app = express()
  , port = 8080
  , mongoUri = 'mongodb://localhost:27017/t-alert-'
  , turdCtrl =  require('./server-assets/controllers/turdCtrl.js')
  , userCtrl = require('./server-assets/controllers/userCtrl.js')


    app.use(session({
  secret: 'masterTurder',
  resave: false,
  saveUninitialized: false
 }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());
    app.use(express.static(__dirname+'/public'));



    passport.use(new FacebookStrategy({
  clientID:"1629221034009715",
  clientSecret:"c9ce134b4f3be9f6a1c86f292c917dd4" ,
  callbackURL: "http://localhost:8080/api/auth/facebook/callback"
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done){
  done(null,user);
});
passport.deserializeUser(function(obj, done){
  done(null,obj);
});

app.get('/api/auth/facebook', passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/api/me',
  failureRedirect: '/#/login'
}), function (req, res) {
  console.log('You have booked the face');

});
app.get('/api/me', function(req,res){
  if(req.isAuthenticated()){
     res.status(200).send(req.user);
  }else {
     res.status(403).send('Nah Brah');
  }
});
//Turd Cruds
    app.post('/api/turds', turdCtrl.addTurd);
    app.get('/api/turds', turdCtrl.getTurds);
    app.get('/api/turd/:id', turdCtrl.getTurd);
    app.patch('/api/turd/:id', turdCtrl.patchTurd);
    app.delete('/api/turd/:id', turdCtrl.removeTurd);
//User Cruds
    app.post('/api/users', userCtrl.addUser);
    app.get('/api/users', userCtrl.getUsers);
    app.get('/api/user/:id', userCtrl.getUser);
    app.patch('/api/user/:id', userCtrl.patchUser);
    app.delete('/api/user/:id', userCtrl.removeUser);



    app.listen(port, function(){
	console.log('we live on turd port: ' + port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('connected to mongo turds at ' + mongoUri);
});


