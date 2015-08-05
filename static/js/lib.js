"use strict";
/**
* writeText is responsible for inserting the messages into the html of the page
* the local user, as well as 3 additional users each have unique colors
* all subsequent users will have their text be displayed in a green font
* @param {string} user this represents the user who sent the message
* @param {string} message this represents the message sent to the room
* @param {string} myName this represents the username of the local user
* @param {Array.<string>} usersSeen represents all users who have sent messages within this rooms lifetime
*/
function writeText(user, message, myName, usersSeen){
    if(user == "myName"){
        $(".text-output").append("<h3> "+ user + " : " + message + " </h3>");
    }
    else {
        if(usersSeen.indexOf(user) < 0){
            usersSeen.push(user);
            localStorage.setItem("user",usersSeen);
        }
       $(".text-output").append("<h3 class='user-" + usersSeen.indexOf(usersSeen) + 
                                        "'> "+ user + " : " + message + " </h3>");
    }
}


//var link_start =  "<iframe frameborder='0' height='100%' width='100%' src='https://www.youtube.com/embed/KMe_5O0mYj0?list=PLU7yGRdtgm632YDvughRw8-1Nj5xzW5V1";

//var link_end = "&autoplay=1&controls=0&showinfo=0&autohide=1'>";
$(document).ready(function(){
    //$(".videoFrame").append(link_start + localStorage.getItem("request") + link_end);
});


$(document).bind("keydown",function(){
    $("#input").focus();
    $(document).unbind("keydown");
});
/** 
* createIO takes two arguments, the name of the project on imrapid(musicality)
* and the room name(blood, the name of the first song) 
*/
var room = createIO("musicality", "blood");

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
* The following portion of code listens for a message event after this, it inserts the 
* recieved message into the DOM with writeText. It will then scroll down to the newest message  
*/

room.on("load_event", function(data){
    console.log("HEYHEYEHYEHYEHYEHYE");
    if(data.load_request_time === 0){
        var ytplayer_window = document.getElementById("playerIFrame").contentWindow;
        var player = ytplayer_window.yt.player.getPlayerByElement(ytplayer_window.player);
        $.ajax({
                type: "POST",
                url: "https://musicality.imrapid.io/load",
                data: {
                    "video": "blood", 
                    "load_request_index": player.getCurrentTime(),
                    "load_request_time":  player.getCurrentIndex(),
                },
                });
    }
   
});
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
      playerVars:{
      "controls": 0,
      "showInfo": 0,
      "autoHide": 0,
      },
      events: {
        "onReady": onPlayerReady,
      }
    });
    }
function onPlayerReady(event) {
    event.target.loadPlaylist(
      ["KMe_5O0mYj0","TWcyIpul8OE","Zo0UfKqwB94","ZMtNyG5OPqM", "xjoA4nYBD5U", "otx49Ko3fxw", "GNTspfhyn1c"], 
      parseInt(localStorage.getItem("index")),
      parseInt(localStorage.getItem("secs")),
      "highres"
      );
}
