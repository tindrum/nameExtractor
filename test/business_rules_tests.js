NameExtractor = require('../nameExtractor');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;  
require('chai').throw;  
  
describe('BR1: name chould be broken into a word list', function() {
  var name1 = new NameExtractor("Deborah Henderson");
  it('should be split into a list (array)', function() {
    expect(name1.nameArray).to.be.an('array');  
  });
});

describe('BR3: name may contain a hyphen', function() {
  var name3 = new NameExtractor("Hillary Rodham-Clinton");
  it('should have hyphenated last name', function() {
    assert.equal(name3.mLast, "Rodham-Clinton");  
  });
  var name2 = new NameExtractor("Courtney-Allyson Hall");
  it('should have a hyphenated first name', function() {
    assert.equal(name2.mFirst, "Courtney-Allyson");
  });
});

describe('BR4: single word names are last names', function() {
  var name4 = new NameExtractor("Bono");
  it('should be a last name', function() {
    assert.equal(name4.mLast, "Bono");
    assert.equal(name4.mFirst, "");
    assert.equal(name4.mTitle, "");
    assert.equal(name4.mSuffix, "");
    assert.equal(name4.mMiddle, "");
  });
});

describe('BR5: Two word names, if first word is title, second word is last name', function() {
  var name5 = new NameExtractor("Mr. Henderson");
  it('should be Title and Last Name', function() {
    assert.equal(name5.mLast, "Henderson");
    assert.equal(name5.mFirst, "");
    assert.equal(name5.mTitle, "Mr");
    assert.equal(name5.mSuffix, "");
    assert.equal(name5.mMiddle, "");
  });
});

describe('BR6: First word not a title, then first two words are First and Last', function() {
  var name6 = new NameExtractor("Alastair Goldfisher");
  it('should be First and Last name', function() {
    assert.equal(name6.mLast, "Goldfisher");
    assert.equal(name6.mFirst, "Alastair");
    assert.equal(name6.mTitle, "");
    assert.equal(name6.mSuffix, "");
    assert.equal(name6.mMiddle, "");
  });
});

describe('BR7: If word is in Title list, treated as title; if not, Title remains empty', function() {
  var name7 = new NameExtractor("Mrs. Abagail Adams");
  it('should have title', function() {
    assert.equal(name7.mTitle, "Mrs");
    assert.equal(name7.mLast, "Adams");
  });
});

describe('BR8: If a word is in the suffix list, it is treated as the suffix. if not the suffix remains empty', function() {
  var name8 = new NameExtractor("Graham Morris, Esq.");
  it('should have a suffix', function() {
    assert.equal(name8.mSuffix, "Esq");
    assert.equal(name8.mFirst, "Graham");
    assert.equal(name8.mLast, "Morris");
  });
});

describe('Middle names', function() {
  var name9 = new NameExtractor("Victor Davis Hanson");
  it('should have a middle name', function() {
    assert.equal(name9.mFirst, "Victor");
    assert.equal(name9.mMiddle, "Davis");
    assert.equal(name9.mLast, "Hanson");
  });
  var name10 = new NameExtractor("Dr. Arthur C. Clarke");
  it('should have title and middle name', function() {
    assert.equal(name10.mFirst, "Arthur");
    assert.equal(name10.mMiddle, "C");
    assert.equal(name10.mLast, "Clarke");
    assert.equal(name10.mTitle, "Dr");
  });
  var name11 = new NameExtractor("Dr. Stephen R. Golding, DDS");
  it('should have title, suffix, and middle name', function() {
    assert.equal(name11.mFirst, "Stephen");
    assert.equal(name11.mMiddle, "R");
    assert.equal(name11.mLast, "Golding");
    assert.equal(name11.mTitle, "Dr");
    assert.equal(name11.mSuffix, "DDS")
  });
});

describe('Number of words passed in', function() {
  it('should error if too many words', function(done) {
    try {
      var name12 = new NameExtractor("Donna Marie April Dawn Henderson");
      done();
    } catch(error) {
      done(error);
    }
  });
  it('should not error on three words', function(done) {
    try {
      var name12 = new NameExtractor("Daniel Glenn Henderson");
      done();
    } catch(error) {
      done(error);
    }
  });
  it('should error if no words', function(done) {
    try {
      var name12 = new NameExtractor("");
      done();
    } catch(error) {
      done(error);
    }
  });
});