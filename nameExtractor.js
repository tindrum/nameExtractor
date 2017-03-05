// The Name Extractor takes the text input of an English/American proper name 
// (i.e. "Mr. John Smith") and extracts the following information from it:

// Title (i.e. "Mr")
// First Name (i.e. "John")
// Middle Name (blank in sample case)
// Last Name (i.e. "Smith")
// Suffix (blank in sample case, could be Jr, II, PhD, DDS, etc)
// From this one input (proper name), we have generated five outputs. 
// In order to get these outputs, we should define some business rules.

function nameExtractor(rawString) {
    
    
    this.inputString = rawString || "", 
    
    this.splitInput = [ ],
    
    this.splitInput = () => {
        this.splitInput = this.inputString.split(/\s+/)    
    }
    
    
    
}

var ne = new nameExtractor();
ne.inputString = "Daniel Henderson";
ne.splitInput();

console.log(ne);
