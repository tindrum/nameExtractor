NameExtractor = require('../nameExtractor');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;  
  
describe('internal structure', function() {
  name = new NameExtractor("Deborah Henderson");
  it('should have a string and an array as elements', function() {
    expect(name.nameString).to.be.a('string');
    expect(name.nameArray).to.be.an('array');  
    
  });
});
