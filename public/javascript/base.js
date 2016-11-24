$(function () {
    $("#adminProfile").show();
    $("#adminProfile").siblings("div").hide();
    $("#adminProfilePic").addClass("active");

    //The following function remove the class active from the main menu and sidebar navigation
    var resetActive=function () {

        //Remove active class from the main menu
        var countMainMenuItems=$("nav div li a").length;
        for(var i=0;i<countMainMenuItems; i++ ){

            if($("nav div li").eq(i).hasClass("active")){
                $("nav div li").eq(i).removeClass("active");
            }
        }

        //Remove active class from the sidebar menu
        var countSideNavItems=$(".sidenav li a").length;
        for(var j=0; j<countSideNavItems; j++){
            $(".sidenav li a").eq(j).removeClass("active");
        }

    };

    //The following control the display of content on the web page based on the input from the user
    $("li>a").click(function () {
        resetActive();
        $(this).addClass("active");

        var id=$(this).attr("id");
        if(id=="addUsers"){
            console.log("addUsers");
            $(".userRequestView").show();
            $(".userRequestView").siblings("div").hide();
            //Ajax GET request to get users data
            var users;
            $.ajax({
                url:'/users',
                Type:'GET',
                dataType:'json',
                success:function (data) {
                    users=data;
                    $(".userRequestView").html(displayUser(data));
                },
                error:function () {
                    throw error;
                }

            });

        }else if(id=="manageUsers"){
            console.log("manageUsers");
            $(".manageUsersView").show();
            $(".manageUsersView").siblings("div").hide();
        }else if(id=="adminProfilePic"){
            $("#adminProfile").show();
            $("#adminProfile").siblings("div").hide();
        }
    });

    //displaying a given user on the admin page
    var displayUser=function (data) {
        var content="";
        content+="<div class='row'>" +
            "<div class = 'col-sm-5'>" +
            "<div class='row'>";
        for (var i=0; i<data.length; i++){
            //For a given user
            content+="<div class='media mentor-box' style='float:left' id='"+data[i]._id+"'>" +
                "<a class='pull-left' href='#'>" +
                "<img class='media-object' data-src='holder.js/64x64' alt='64x64' style='width: 60px; height: 60px;' src='"+data[i].profilePicture+"'>" +
                "</a>" +
                "<div class='media-body'>" +
                "<h5 class='media-heading'>"+data[i].givenname+" "+data[i].familyname+"</h5>" +
                "<a>"+data[i].specialty+"</a>" +"<div class='pull-right'>" +
                "<a href = '#' class = 'btn btn-primary' role = 'button'>" +
                "<span class='glyphicon glyphicon-pencil'></span>" +
                "</a>" +
                "<a href = '#' class = 'btn btn-default' role = 'button'>" +
                "<span class='glyphicon glyphicon-trash'></span>" +
                "</a>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        content+="</div>" +
            "</div>" +
            "</div>";
        return content;
    }

});
