var express = require('express');
var httpRequest = require('request');
var handlebars = require('express-handlebars') .create({ defaultLayout:'main' });
var bodyParser = require('body-parser');

var app = express();

app.requestBinUrl = 'http://requestb.in/13tcawk1';
app.set('port', process.env.PORT || 3000);
// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))  // parse application/x-www-form-urlencoded 

app.route('/business/:id/upload')
  .get(function (req, res) {
    var businessId = req.params.id;
    res.render('upload', {id: businessId});
  })
  .post(function (req, res) {
    var businessId = req.params.id;

    var dataObj = {business: ""+businessId, customers: []};
    var customerData = req.body.csvCustomerData.split('\r\n')
    dataObj.customers = customerData.map(function(curr){
      var result = {};
      var fields = curr.split(',');
      result.name = fields[0];
      result.email = fields[1];
      return result;
    });
    var json = JSON.stringify(dataObj, null, 2);
    console.log('json = ', json);

    // send json to Request Bin for persistence
    httpRequest.post({url: app.requestBinUrl, form: json}, function(error, response, body){
      if (!error) {
        console.log(body);
        res.render('thankyou', {data: JSON.stringify(req.body.csvCustomerData, null, 2)});
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

// {
//   "business": "opsdsagiopas",
//   "customers": [
//     {
//       "name": "balah bahoab"
//       "email": "blah@blah.com"
//     }
//   ]
// }
