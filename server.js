var express =require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , app = express()
  , port = 8080
  , mongoUri = 'mongodb://localhost:27017/t-alert-';


    app.use(bodyParser.json());
    app.use(cors());




   



    app.listen(port, function(){
	console.log('we live on ' + port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('connected to mongo at ' + mongoUri);
});


