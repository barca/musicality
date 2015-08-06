"use strict";
/**
* the navigateToMainContent function stores all relevent meta-data needed to run the app, and navigates to the main page
* time stores the elapsed seconds since the start of the stream, its tell the youtube api where to begin the app
* start, stores the timestamp (localized) when the stream began
* users, an array that stores the names of the users who have previously spoken during this viewing session
* users always starts as an empty array
* name, indicates the name of the user on this machine, provided by the text input
*/
function navigateToMainContent(){
    var username = document.getElementById("username_input").value;
    if(localStorage.getItem("time") === "0"){
        localStorage.setItem("start", moment());
    }
    if (username.length > 3){
        localStorage.setItem("name", username);
        localStorage.setItem("users", JSON.stringify([]));
        var time_since_start = moment().diff(moment(localStorage.getItem("start")), "seconds");
        localStorage.setItem("time", t);
        window.location.assign("index.html");

        return true;        
    }
    else {
        window.alert("insufficent length of username");
        return false;
    }
}
/** 
* createIO takes two arguments, the name of the project on imrapid(musicality)
* and the room name(blood, the name of the video) 
*/

var room = createIO("musicality", "blood");

/**
* this listens for load_event events, 
* upon recieving such an event from anyone already in session, it stores the time
* it then calculates when the viewing event started, storing the localized time
*
*/
room.on("load_event", function(data) {
    if(data.time != "0"){
        localStorage.setItem("time", data.time);
        localStorage.setItem("start", moment().subtract(data.time, "seconds"));
    }
});

$(document).ready(function(){
    /**
    * When the "listen Live!" button is clicked, navigateToMainContent is called, 
    * and the value true is returned 
    */
    document.getElementById("submit").onclick = function() {
        navigateToMainContent();
        return true;
    };
    /**
    * When the enter key is pressed, navigateToMainContent is called, 
    * and the value true is returned, this allows the program to break out of the text input
    */
    $(document).keypress(function(){
        if (event.which == 13 || event.keyCode == 13){
            event.preventDefault();
            navigateToMainContent();
            return true;

        }
    });
    /**
    * When the site is first loaded, a request is sent to find anyone who is currently viewing 
    * if an individual is watching, this ajax request will prompt them to provide 
    * the seconds elapsed since the start of the video
    */
    $.ajax({
        type: "POST",
        url: "https://musicality.imrapid.io/load",
        data: {
            "video": "blood", 
            "time": 0,
        }
    });
    localStorage.setItem("time", 0);
});

