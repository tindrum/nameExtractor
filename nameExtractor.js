#!/usr/bin/env node
// The Name Extractor takes the text input of an English/American proper name 
// (i.e. "Mr. John Smith") and extracts the following information from it:

// Title (i.e. "Mr")
// First Name (i.e. "John")
// Middle Name (blank in sample case)
// Last Name (i.e. "Smith")
// Suffix (blank in sample case, could be Jr, II, PhD, DDS, etc)
// From this one input (proper name), we have generated five outputs. 
// In order to get these outputs, we should define some business rules.

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


function NameExtractor(rawString) {
  
  this.nameString = rawString || "", 
  
  this.nameArray = [ ],
  
  // this.ExtractWords();
  // this.FindTitle();
  // this.FindSuffix();
  this.ParseName();
  
}

// use a regex to split the string into an array.
// Save TitleList and SuffixList as *properties* of the prototype.
NameExtractor.prototype.TitleList = ("Mr.,Mr,Ms.,Ms,Miss.,Miss,Dr.,Dr,Mrs.,Mrs,Fr.,Capt.,Lt.,Gen.,President,Sister,Father,Brother,Major".split(/,/))

NameExtractor.prototype.SuffixList = ("DDS,CFA,CEO,CFO,Esq,CPA,MBA,PhD,MD,DC,Sr,Jr,II,III,IV".split(/,/));


// JavaScript uses a prototype chain. 
// There are no true Classes in JS. Objects still have inheritence, though.
// By putting the `ExtractWords` method into the *prototype* 
// of the NameExtractor object, each instance will:
//   + inherit this method from the object's prototype
//   + NOT include its own version of it (in memory, as well as in inheritence)
// The prototype of an object is the parent object of it. 
// There is a prototype chain (an object's prototype can have a prototype, &c)
// Nearly all objects in JavaScript are instances of 'Object'

// Public methods
NameExtractor.prototype.ExtractWords = function() {
        this.nameArray = this.nameString.split(/[\s,:\.]+/);
        this.nameArray = this.nameArray.filter(entry => entry.trim() != ''); // remove empty elements from array
            const arrayLength = this.nameArray.length;
            if ( arrayLength <= 0) {
                // console.error("No elements in array.");
                throw 'no names to process';
            } else if ( arrayLength > 5 ) {
              // name has too many elements,
              // throw an exception 
              throw 'too many names';
            }
};

NameExtractor.prototype.FindTitle = function() {
    if (this.nameArray.length > 0) {
        if ( this.TitleList.indexOf(this.nameArray[0]) >= 0 ) {
            this.mTitle = this.nameArray[0];
            return 0;
        } else {
            return -1; // no title
        }
    }
    return -1; 
};

NameExtractor.prototype.FindSuffix = function() {
  // Unlike the sample code,
  // this function returns the location in the array
  // where the suffix is found. 
  //
  if ( this.nameArray[4] && this.SuffixList.indexOf(this.nameArray[4]) >= 0) {
      this.mSuffix = this.nameArray[4];
      return 4;
  } 
  if ( this.nameArray[3] && this.SuffixList.indexOf(this.nameArray[3]) >= 0 ) {
      this.mSuffix = this.nameArray[3];
      return 3;
  }
  if ( this.nameArray[2] && this.SuffixList.indexOf(this.nameArray[2]) >= 0 ) {
      this.mSuffix = this.nameArray[2];
      return 2;
  }
  if ( this.nameArray[1] && this.SuffixList.indexOf(this.nameArray[1]) >= 0 ) {
      this.mSuffix = this.nameArray[1];
      return 1;
  }
            
    
    return -1;
};

NameExtractor.prototype.FindLastName = function() {
  // The location in the array where the suffix is found
  // is one position past where the last name is found.
  // 
  var lastLocation = -1;
  switch (this.suffixLocation) {
  case -1:
    // no suffix, so still don't know where last name is.
    // Last name will be last item in array.
    var lastItem = this.nameArray.length - 1;
    this.mLast = this.nameArray[lastItem];
    lastLocation = lastItem;
    // console.log("Finding Last Name, no suffix branch");
    // console.log(this.nameArray);
    break;
  case 4:
    // last name is at index 3
    this.mLast = this.nameArray[3];
    lastLocation = 3;
    break;
    
  case 3:
    // last name is at index 2
    this.mLast = this.nameArray[2];
    lastLocation = 2;
    break;
    
  case 2:
    // last name is at index 1
    this.mLast = this.nameArray[1];
    lastLocation = 1;
    break;
    
  case 1:
    // last name is at index 0
    this.mLast = this.nameArray[0];
    lastLocation = 0;
    break;
    
  default:
    throw 'name input string has too many words';
    
  }
  return lastLocation;
};

NameExtractor.prototype.FindFirstName = function() {
  if (this.titleLocation == 0) {
    // name has a title
    if (this.lastNameLocation == 1 ) {
      // no first name
      return -1;
    } else {
      this.mFirst = this.nameArray[1];
      return 1;
    }
  } else {
    // name does not have a title
    if (this.lastNameLocation == 0) {
      // only one name, a last name
      return -1;
    } else {
      this.mFirst = this.nameArray[0];
      return 0;
    }
  }
  throw 'first name error';
};

NameExtractor.prototype.FindMiddleName = function() {
  if ( this.firstNameLocation >= 0 && ((this.firstNameLocation + 2) == this.lastNameLocation )) {
    // the first name is not empty, AND
    // there is a gap of one between first and last, 
    // must be a middle name
    this.mMiddle = this.nameArray[this.firstNameLocation + 1];
  }
};

NameExtractor.prototype.ParseName = function() {
  // initial values
  this.mTitle = "";
  this.mFirst = "";
  this.mMiddle = "";
  this.mLast = "";
  this.mSuffix = "";
  this.suffixLocation = 0;
  this.titleLocation = -1;
  this.lastNameLocation = -1;
  this.firstNameLocation = -1;
  
  if (( this.nameString != null ) && ( this.nameString != "")) {
    this.ExtractWords();
    this.titleLocation = this.FindTitle();
    this.suffixLocation = this.FindSuffix();
    this.lastNameLocation = this.FindLastName();
    this.firstNameLocation = this.FindFirstName();
    this.FindMiddleName();
  }
  // console.log(this.nameArray);
  // console.log(this.nameArray.length);
  // console.log(this.mSuffix + this.suffixLocation);
  // console.log("last name is at: " + this.lastNameLocation);
};

// Private methods
// not sure how to actually hide them, 
// so they're "private-style" for now

// confirm that the correct number of words were gotten from the string
// and are in the array
NameExtractor.prototype.validArrayLength = function() {
        if ( this.nameArray.length < 1 || this.nameArray.length > 5 ) {
            return false;
        }
        return true;
};



// var ne = new NameExtractor();
// ne.nameString = "Daniel Henderson";
// ne.ExtractWords();
//
// var another = new NameExtractor("Mrs. Deborah Karen Henderson, Esq.");
//
// console.log(ne);
// console.log(another);
//
// var emptyName = new NameExtractor("");
// console.log(emptyName);
// console.log(another.mTitle);
//
// var thurston = new NameExtractor("Thurston Howell III");
// console.log(thurston);
//
// var pinski = new NameExtractor("Dr. Drew Pinski");
// console.log(pinski);
//

module.exports = NameExtractor