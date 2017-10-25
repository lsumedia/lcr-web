

/* Load server config */

var config = require('./config.json');

const http = require('http');
const express = require('express');


/* Init server */

var app = express();

var server = http.createServer(app);

app.use('/dashboard', express.static('dashboard/build'));

if(Number.isInteger(config.port) == true){
    
      /* Start server */
      server.listen(config.port, function () {
        console.log('Listening on port ' + config.port);
      });
    
    }