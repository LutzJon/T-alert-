var express =require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , app = express()
  , port = 8080
  , mongoUri = 'mongodb://localhost:27017/t-alert-'
  , turdCtrl =  require('./server-assets/controllers/turdCtrl.js')

    app.use(bodyParser.json());
    app.use(cors());

    app.post('/api/turds', turdCtrl.addTurd);
    app.get('/api/turds', turdCtrl.getTurds);
    app.get('api/turd/:id', turdCtrl.getTurd);
    app.patch('/api/turd/:id', turdCtrl.patchTurd);
    app.delete('/api/turd/:id', turdCtrl.removeTurd);



    app.listen(port, function(){
	console.log('we live on turd port: ' + port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('connected to mongo turds at ' + mongoUri);
});


