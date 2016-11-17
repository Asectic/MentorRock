'use strict';

/* Saving input ID instances as arrays */
var academics = ["aboriginal", "accounting", "african", "american", "east-asian", "animal-phys", "anthropology", "statistics", "mathematics", "archaelogy", "architect", "art", "genetics", "biochemistry", "ecology", "biodiversity", "bioethics", "bioinformatics", "compute-biology", "bio-chemistry", "canadian", "chemistry", "christianity", "cinema", "cognitive", "comp-sci", "criminology", "biology", "engineering", "linguistics"];

var interests = ["tennis", "swimming", "basketball", "baseball", "programming", "image-edit", "blogging", "reading", "writing", "play-instr", "piano", "violin", "olympics", "teaching", "volunteering", "cooking", "cleaning", "gardening", "arts-crafts", "forestry", "beauty", "birdwatch", "walking", "cosplaying", "origami", "gaming", "flower-arrange", "yoga", "modeling", "magic"];

// Hides or Shows a Div Element
function toggleDiv(divId) {
   $("#"+divId).toggle();
}

// Initalize the toggle actions if needed (on page load)
/*function init() {
    
}*/

// Toggles Academic and Interests button divs once clicked
function showList(input) {
    if(input == "academics") {
        var tog = document.getElementById("academics-box").id;
        toggleDiv(tog); 
    } else if(input == "interests-butt") {
        var tog = document.getElementById("interests-box").id;
        toggleDiv(tog);
    }   
}

function submitInterests() {
    
    // Returns all input button elements in a list
    var acad_table = document.getElementById('academic-table');
    var inter_table = document.getElementById('interests-table');
    var acad_inputs = acad_table.getElementsByTagName('input');
    var inter_inputs = inter_table.getElementsByTagName('input');
    
    // Boolean flag for non checked
    var is_checked = false;
    
    // Arrays for checked buttons
    var filledInterests = [];
    
    // Loop over the button inputs
    // First looping over acad_inputs
    for (var x = 0; x < acad_inputs.length; x++) {
        if(acad_inputs[x].type == 'checkbox') {
            
            // Save the checked boolean of current button
            // and save to flag
            is_checked = acad_inputs[x].checked;
            
            // if is_checked == True
            if(is_checked) 
                filledInterests.push(acad_inputs[x]);
        }
    }
    // is_checked will be boolean 'true' if any are checked at this point.
    
    // Now append it as UL
    // Create the list element:
    var list = document.createElement('ul');
    
    
    for (var i = 0; i < filledInterests.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(filledInterests[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // This returns "<ul></ul>" for some reason
    document.getElementById('result').appendChild(list);
}
