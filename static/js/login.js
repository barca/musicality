"use strict";
function call(){
    var username = document.getElementById("username_input").value;
    if(localStorage.getItem("load_request_time") == "0"){
        localStorage.setItem("start", moment());
    }
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

$(document).ready(function(){
    alert("sent")
     $.ajax({
        type: "POST",
        url: "https://musicality.imrapid.io/load",
        data: {
            "video": "blood", 
            "time": 120,
        }
        });
     //localStorage.setItem("load_request_time", 0);

});
room.on("load_event", function(data) {
    //if(data.load_request_time != "0"){
        localStorage.setItem("time", data.time);
        localStorage.setItem("started", 0); //moment().subtract(data.load_request_time, "seconds"));
        alert(localStorage.getItem("time"))
    //}
});
 

