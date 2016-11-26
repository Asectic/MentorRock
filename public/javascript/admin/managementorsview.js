$(function () {

    $("#manageMentors").addClass("active");

    var mentorsView=function () {
        $(".manageMentorsView").show();
        $(".manageMentorsView").siblings("div").hide();
        var users;
        $.ajax({
            url:'/users?role=mentor',
            Type:'GET',
            dataType:'json',
            success:function (data) {
                users=data;
                console.log(JSON.stringify(data));
                $(".manageMentorsView").html(displayUser(data));
            },
            error:function () {
                throw error;
            }

        });
    };

    mentorsView();
});
