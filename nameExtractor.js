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
    
    this.inputString = rawString || "", 
    
    this.inputArray = [ ]
    
}

// use a regex to split the string into an array.
// Save TitleList and SuffixList as *properties* of the prototype.
NameExtractor.prototype.TitleList = "Mr.,Mr,Ms.,Ms,Miss.,Miss,Dr.,Dr,Mrs.,Mrs,Fr.,Capt.,Lt.,Gen.,President,Sister,Father,Brother,Major".split(/,/);

NameExtractor.prototype.SuffixList = "DDS,CFA,CEO,CFO,Esq,CPA,MBA,PhD,MD,DC,Sr,Jr,II,III,IV".split(/,/);


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
        this.inputArray = this.inputString.split(/[\s,:\.]+/);
        this.inputArray = this.inputArray.filter(entry => entry.trim() != ''); // remove empty elements from array
        if (! this.validArrayLength()) {
            const arrayLength = this.inputArray.length;
            console.log("Array has improper length");
            if ( arrayLength <= 0) {
                console.log("No elements in array.");
            } else if ( arrayLength > 5 ) {
                console.log("Chopping off " + arrayLength - 5 + " elements from the end.");
                console.log("You're going to lose " + this.inputArray.slice(5, arrayLength));
                this.inputArray.slice(0, 4);
            }
            
        }
};
NameExtractor.prototype.FindTitle = function() {
    
};

NameExtractor.prototype.FindSuffix = function() {
    
};

NameExtractor.prototype.ParseName = function() {
    
};

// Private methods
// not sure how to actually hide them, 
// so they're "private-style" for now

// confirm that the correct number of words were gotten from the string
// and are in the array
NameExtractor.prototype.validArrayLength = function() {
        if ( this.inputArray.length < 1 || this.inputArray.length > 5 ) {
            return false;
        }
        return true;
};



var ne = new NameExtractor();
ne.inputString = "Daniel Henderson";
ne.ExtractWords();

var another = new NameExtractor("Mrs. Deborah Karen Henderson, Esq.");
console.log(another.ExtractWords());

console.log(ne);
console.log(another);

var emptyName = new NameExtractor("");
emptyName.ExtractWords();

