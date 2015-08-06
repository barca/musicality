"use strict";
/**
* writeText is responsible for inserting the messages into the html of the page
* the local user, as well as 3 additional users each have unique colors
* all subsequent users will have their text be displayed in a green font
* @param {string} user this represents the user who sent the message
* @param {string} message this represents the message sent to the room
* @param {string} myName this represents the username of the local user
* @param {Array.<string>} usersSeen represents all users who have sent messages within this room's lifetime
*/
function writeText(user, message, myName, usersSeen){
    if(user == myName){
        $(".text-output").append("<h3 class='myName'> "+ user + " : " + message + " </h3>");
    }
    else {
        if(usersSeen.indexOf(user) == -1){
            usersSeen.push(user)
            localStorage.setItem("user",usersSeen.push());
        }
       $(".text-output").append("<h3 class='user-" + usersSeen.indexOf(user) + 
                                        "'> "+ user + " : " + message + " </h3>");
    }
}
/**
* this is responsible for directing 
* all keyboard typing into the chat bar
*/
$(document).bind("keydown",function(){
    $("#input").focus();
    $(document).unbind("keydown");
});
/**
* pressing the enter key will trigger an ajax request
* which sends the contents of the chatbar (defined by the ID input) to the room 
*/
$(document).keypress(function(e){
    if (e.which == 13){
        	 $.ajax({
        	 	type: "POST",
        	 	url: "https://musicality.imrapid.io/chat",
        	 	data: {
        	 		"video": "blood", 
        	 		"message": document.getElementById("input").value,
        	 		"user": localStorage.getItem("name")
        	 	},
        	 	});
        	document.getElementById("input").value = "";
    }
});


/** 
* createIO takes two arguments, the name of the project on imrapid(musicality)
* and the room name(blood, the name of the video) 
*/

var room = createIO("musicality", "blood");

/**
* The following portion of code listens for a "message" event after this, it inserts the 
* recieved message into the DOM with writeText. It will then scroll down to the newest message  
*/
room.on("message", function(data) {
	writeText(data.user, data.message, localStorage.getItem("name") , JSON.parse(localStorage.getItem("users")));
	var objDiv = document.getElementById("text");
	objDiv.scrollTop = objDiv.scrollHeight;
});
/**
* the below segment of JS code is used for all the player logic, primarily taken from youtube's 
* iframe API website.
*/
var tag = document.createElement("player");
tag.src = "https://www.youtube.com/iframe_api";
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: "KMe_5O0mYj0",
      playerVars:{
      "controls": 0,
      "showInfo": 0,
      "autoHide": 0,
      "start" : parseInt(localStorage.getItem("time")),
      "iv_load_policy": 3
      },
      events: {
        "onReady": onPlayerReady,
      }
    });
    }

function onPlayerReady(event) {
    event.target.playVideo();
  }

/**
* this listens for load_event events, 
* upon recieving such an event, it responds by giving 
* the time elapsed in an ajax function
*
*/
room.on("load_event", function(data) {
    if(data.time === 0){
        $.ajax({
                type: "POST",
                url: "https://musicality.imrapid.io/load",
                data: {
                    "video": "blood", 
                    "time":  moment().diff(moment(localStorage.getItem("start")), "seconds")
                },
                });

    }
    
});
