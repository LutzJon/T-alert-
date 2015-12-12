var express =require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , app = express()
  , port = 8080
  , mongoUri = 'mongodb://localhost:27017/t-alert-'
  , turdCtrl =  require('./server-assets/controllers/turdCtrl.js')
  , userCtrl = require('./server-assets/controllers/userCtrl.js')

    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static(__dirname+'/public'));
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


