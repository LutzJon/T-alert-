var express =require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , session = require('express-session')
  , FacebookStrategy = require('passport-facebook')
  , passport = require('passport')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
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


    //img upload
    app.get('/', function(req, res){
    res.sendfile(__dirname + '/mainturds.html');
});

app.post('/upload', function(req, res) {
    var image =  req.files.image;
    var newImageLocation = path.join(__dirname, 'public/images', image.name);
    
    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            res.json(200, { 
                src: 'images/' + image.name,
                size: image.size
            });
        });
    });
});



//facebook stuff
    passport.use(new FacebookStrategy({
  clientID:"need new",
  clientSecret:"need new" ,
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
//facebook auth
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


