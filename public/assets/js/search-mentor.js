'use strict';

function toggleDiv(divId) {
   $("#"+divId).toggle();
}

// Initalize the toggle actions
function init() {
    
}

function showList(input) {
    if(input == "academics") {
        
        var tog = document.getElementById("academics-box").id;
        toggleDiv(tog);
    } else if(input == "interests-butt") {
        
        var tog = document.getElementById("interests-box").id;
        toggleDiv(tog);

    }
    
}

// Init this file on load
//init();