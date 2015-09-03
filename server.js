var express = require('express');
var httpRequest = require('request');
var handlebars = require('express-handlebars') .create({ defaultLayout:'main' });
var bodyParser = require('body-parser');
var path = require('path');
var parser = require('./parser.js');

var users = {
  1: 'Foobar Inc.',
  2: 'Bazfizz Corp',
  3: 'Acme Ventures',
  4: 'Lee Brothers',
  5: 'Brown and Company'
}

var app = express();

app.requestBinUrl = 'http://requestb.in/13tcawk1';
app.set('port', process.env.PORT || 3000);
// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))  // parse application/x-www-form-urlencoded 
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.route('/business/:id/upload')
  .get(function (req, res) {
    var businessId = req.params.id;
    res.render('upload', {id: businessId});
  })
  .post(function (req, res) {
    var businessId = req.params.id;

    // create and populate object to be converted to json
    var dataObj = {business: ""+businessId, customers: []};
    
    //@TODO assumes that submission includes header row, error checking needed
    var customerData = req.body.csvCustomerData.trim().split('\r\n').slice(1);
    
    try {
      dataObj.customers = parser.parseCustomerData(customerData);
    } catch(err) {
      res.render('error', {id: businessId, details: err.message});
      return;
    }

    // send json to Request Bin for persistence
    var json = JSON.stringify(dataObj, null, 2);
    httpRequest.post({url: app.requestBinUrl, form: json}, function(error, response, body){
      if (!error) {
        res.render('thankyou', {name: users[businessId]});
      } else {
        console.log(error);
        res.render('error', {id: businessId, details: error.message});
      }
    });


  });

// custom 404 page
app.use(function(req, res, next){ res.type('text/plain');
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){ console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.render('500');
});

module.exports = app;