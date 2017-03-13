NameExtractor = require('../nameExtractor');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;  
  
describe('BR1: name chould be broken into a word list', function() {
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

describe('BR5: Two word names, if first word is title, second word is last name', function() {
  name1 = new NameExtractor("Mr. Henderson");
  it('should be Title and Last Name', function() {
    assert.equal(name1.mLast, "Henderson");
    assert.equal(name1.mFirst, "");
    assert.equal(name1.mTitle, "Mr");
    assert.equal(name1.mSuffix, "");
    assert.equal(name1.mMiddle, "");
  });
});

describe('BR6: First word not a title, then first two words are First and Last', function() {
  name1 = new NameExtractor("Alastair Goldfisher");
  it('should be First and Last name', function() {
    assert.equal(name1.mLast, "Goldfisher");
    assert.equal(name1.mFirst, "Alastair");
    assert.equal(name1.mTitle, "");
    assert.equal(name1.mSuffix, "");
    assert.equal(name1.mMiddle, "");
  });
});

describe('BR7: If word is in Title list, treated as title; if not, Title remains empty', function() {
  name1 = new NameExtractor("Mrs. Abagail Adams");
  it('should have title', function() {
    assert.equal(name1.mTitle, "Mrs");
    assert.equal(name1.mLast, "Adams");
  })
})