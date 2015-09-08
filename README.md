#CSV Uploader
Accepts a csv file, parses it to json, and saves data to Request Bin

##Server Side
Node/Express, Handlebars for templating, Request for http requests

##Client Side
jQuery and Bootstrap

##Tests
Tests are written in Mocha/Chai and us Zombie for headless browsing

package.json includes:
  "scripts": {
    "test": "mocha"
  },

That allows all the test witin the /test direcotry to be run with a singel command 

    `npm test`

##Getting started
    `npm install`
    
    `nodemon index.js`
    