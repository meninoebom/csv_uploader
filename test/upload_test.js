const Browser = require('zombie');
const parser = require('../parser.js');
const app = require('../server.js');
const fs = require('fs');
const expect = require('chai').expect;

describe('CSV Uploader', function() {

  before(function() {
    this.server = app.listen(9000);
    this.browser = new Browser({ site: 'http://localhost:9000' });
  });
  
  before(function(done) {
    this.browser.visit('/business/1/upload', done);
  });
  
  describe('The csv to array parsing function', function() {
    it('should accept a CSV and return array of customer objects', function(done){    
      fs.readFile('MOCK_DATA.csv', 'utf8', function(err, data){
        if(err) throw new Error('File does\'t exits.');
        var array = parser.parseCustomerData(data);
        expect(array).to.be.a('array');
        done();
      });
    });
  });

  describe('The CSV upload UI', function() {
    it('should show csv upload form', function(){

    });
    it('should refuse empty submissions', function() {

    });
    it('should accept complete submissions', function(){

    });
    // it('should refuse invalid emails');
  });

  after(function() {
    this.server.close();
  });

});