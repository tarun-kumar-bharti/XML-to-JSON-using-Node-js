const express 		= require('express');
const compression 	= require('compression');
const fs 		= require('fs');
const helmet 		= require('helmet');
const bodyParser 	= require('body-parser'); 		 
const cors 		= require('cors');	
const xmlparser 	= require('express-xml-bodyparser');
const app 		= express();


app.use(compression());
app.use(helmet());

app.use(express.json());
app.use(xmlparser());
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(function (req, res, next) {  
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');   
    res.setHeader('Access-Control-Allow-Headers', '*');   
    res.setHeader('Access-Control-Allow-Credentials', true);   
    next();
});

// Import Routes
const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/users', authRoute);
app.use('/api/inrecon', authRoute);

 						
var options = {   
     
	key: fs.readFileSync('/etc/apache2/cirtificate/bizdata.key'),
    	cert: fs.readFileSync('/etc/apache2/cirtificate/594e68a0bdbe74ba.crt'),
    	ca: fs.readFileSync('/etc/apache2/cirtificate/gd_bundle-g2-g1.crt'),
   	requestCert: false 
	 
};

var server = require('https').createServer(options, app);
 
const port = process.env.PORT || 3302;
server.listen(port, () => console.log(`Server is running on ${port}`)); 
 
//app.listen(port, () => console.log('App listening on port : '+port)); 
