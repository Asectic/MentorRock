'use strict';

function toggleDiv(divId) {
   $("#"+divId).toggle();
}

// Initalize the toggle actions
function init() {
    
}

// Toggles Academic and Interests button divs once clicked
function showList(input) {
    if(input == "academics") {
        
        var tog = document.getElementById("academics-box").id;
        //var pag = document.getElementById("ac-page").id;
        toggleDiv(tog);
        //toggleDiv(pag);
        
    } else if(input == "interests-butt") {
        
        var tog = document.getElementById("interests-box").id;
        toggleDiv(tog);

    }
    
}

