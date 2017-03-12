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
    
    this.ExtractWords();
    this.FindTitle();
    this.FindSuffix();
    
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
                console.error("No elements in array.");
            } else if ( arrayLength > 5 ) {
                console.error("Chopping off " + arrayLength - 5 + " elements from the end.");
                console.error("You're going to lose " + this.nameArray.slice(5, arrayLength));
                this.nameArray.slice(0, 4);
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
    if ( this.nameArray[4] ) {
        this.mSuffix = this.nameArray[4];
        return 0;
    } else {
        if ( this.nameArray[2] && this.SuffixList.indexOf(this.nameArray[2] >= 0 )) {
            this.mSuffix = this.nameArray[2];
            return 0;
        }
        if ( this.nameArray[3] && this.SuffixList.indexOf(this.nameArray[3] >= 0 )) {
            this.mSuffix = this.nameArray[3];
            return 0;
            }
            
    }
    return -1;
};

NameExtractor.prototype.ParseName = function() {
    
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



var ne = new NameExtractor();
ne.nameString = "Daniel Henderson";
ne.ExtractWords();

var another = new NameExtractor("Mrs. Deborah Karen Henderson, Esq.");

console.log(ne);
console.log(another);

var emptyName = new NameExtractor("");
console.log(emptyName);
console.log(another.mTitle);

var thurston = new NameExtractor("Thurston Howell III");
console.log(thurston);

var pinski = new NameExtractor("Dr. Drew Pinski");
console.log(pinski);
