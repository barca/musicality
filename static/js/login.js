"use strict";
function call(){
    var username = document.getElementById("username_input").value;
    if (username.length > 3){
        localStorage.setItem("name", username);
        localStorage.setItem("users", JSON.stringify([]));
        window.location.assign("index.html");
        return true;        
    }
    else {
        window.alert("insufficent length of username");
        return false;
    }
}
document.getElementById("submit").onclick = function() {
    call();
    return true;
};
$(document).keypress(function(){
    if (event.which == 13 || event.keyCode == 13){
        event.preventDefault();
        call();
        return true;

    }
});
var room = createIO("musicality", "blood");

$(document).load(function(e){
    if (e.which == 13){
             $.ajax({
                type: "POST",
                url: "https://musicality.imrapid.io/load",
                data: {
                    "video": "blood", 
                    "load_request_secs": "0",
                    "load_request_index": "0",
                },
                });
             localStorage.setItem = ("request", "");
    }
});
room.on("load_event", function(data) {
    localStorage.setItem("secs", data.load_request_secs);
    localStorage.setItem("index", data.load_request_index);
});
 

