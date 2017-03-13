NameExtractor = require('../nameExtractor');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;  
  
describe('BR1: name could be broken into a word list', function() {
  name1 = new NameExtractor("Deborah Henderson");
  it('should be split into a list (array)', function() {
    expect(name1.nameArray).to.be.an('array');  
  });
});

describe('BR3: name may contain a hyphen', function() {
  name1 = new NameExtractor("Hillary Rodham-Clinton");
  it('should have hyphenated last name', function() {
    assert.equal(name1.mLast, "Rodham-Clinton");  
  });
  name2 = new NameExtractor("Courtney-Allyson Hall");
  it('should have a hyphenated first name', function() {
    assert.equal(name2.mFirst, "Courtney-Allyson");
  });
});

describe('BR4: single word names are last names', function() {
  name1 = new NameExtractor("Bono");
  it('should be a last name', function() {
    assert.equal(name1.mLast, "Bono");
    assert.equal(name1.mFirst, "");
    assert.equal(name1.mTitle, "");
    assert.equal(name1.mSuffix, "");
    assert.equal(name1.mMiddle, "");
  });
});

describe('BR5: ')