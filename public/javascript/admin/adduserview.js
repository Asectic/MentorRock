$(function () {
    $("#addUsers").addClass("active");

    //when adding a user print success message
    $("#addNewUser").click(function () {
        $(".feedback").html("<p class='success'>Successfully added the user</p>");

    });


});


