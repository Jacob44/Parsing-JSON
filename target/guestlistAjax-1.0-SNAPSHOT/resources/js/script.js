$(function() {
    $("#send").click(updateGuests);
});

function updateGuests() {
    var first = $("#first").val();
    var last = $("#last").val();

    $.ajax("guest.ajax", {
        "type": "post",
        "data": {
            "first": first,
            "last": last
        }
    }).done(displayGuests);
}

function displayGuests(data) {
    // Assuming `data` is an array of guest objects returned by the server
    var guestList = "<ul>";
    data.forEach(function(guest) {
        guestList += "<li>" + guest.first + " " + guest.last + "</li>";
    });
    guestList += "</ul>";

    $("#guestList").html(guestList);  // Update the DOM with the new guest list
}
