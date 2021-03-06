'use strict';

const Browser = require('zombie');
const parser = require('../parser.js');
const app = require('../server.js');
const fs = require('fs');
const expect = require('chai').expect;

describe('CSV Uploader', function() {

  let browser;
  let server;

  // setup
  before(function() {
    server = app.listen(9876);
    browser = new Browser({ site: 'http://localhost:9876' });
  });
  
  // async setup
  before(function(done) {
    browser.visit('/business/1/upload', done);
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

  describe('The csv upload ui', function() {
    it('should load successfully', function(){
      browser.assert.success();
    });

    it('should show csv upload form', function(){
      browser.assert.text('h1', 'Broadly Customer CSV Uploader');
      browser.assert.element('#customer-data-form');
    });

    it('should display button for submitting form', function() {
      browser.assert.text('#customer-data-form-submit-btn', 'Submit');
    });

    it('should display instructional text', function() {
      browser.assert.attribute('textarea', 'placeholder', 'Copy and paste your customer data here');
    });

    it('should reject empty submissions', function(done) {
      browser.pressButton('Submit', function(){
        browser.assert.elements('.form-group.has-error', 1);
        browser.assert.text('.error-modal-content', 'Please paste your customer data in the field provided.');
        browser.assert.text('.modal-close-btn', 'Close');
      });
      browser.pressButton('Close', function() {
        browser.assert.text('.modal-close-btn', 'Close');
        done();
      });
    });

    it('should accept complete submissions', function(done){
      fs.readFile('MOCK_DATA.csv', 'utf8', function(err, data){  
        browser.fill('#customer-data-text-field', data);
        browser.pressButton('Submit', function(){
          browser.assert.text('h1','Your custmer data has been successfully saved.');
          done();
        });
      });
    });
  });

  after(function() {
    server.close();
  });
});