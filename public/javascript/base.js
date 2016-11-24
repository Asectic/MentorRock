$(function () {
    $("#adminProfile").show();
    $("#adminProfile").siblings("div").hide();
    $("#adminProfilePic").addClass("active");

    //The following function remove the class active from the main menu and sidebar navigation
    var resetActive=function () {

        //Remove active class from the main menu
        var countMainMenuItems=$("nav div li a").length;
        for(var i=0;i<countMainMenuItems; i++ ){

            if($("nav div li a").eq(i).hasClass("active")){
                $("nav div li a").eq(i).removeClass("active");
            }
        }

        //Remove active class from the sidebar menu
        var countSideNavItems=$(".sidenav li a").length;
        for(var j=0; j<countSideNavItems; j++){
            $(".sidenav li a").eq(j).removeClass("active");
        }

    }

    //The following control the display of content on the web page based on the input from the user
    $("li>a").click(function () {
        resetActive();
        $(this).addClass("active");

        var id=$(this).attr("id");
        if(id=="addUsers"){
            console.log("addUsers");
            $(".userRequestView").show();
            $(".userRequestView").siblings("div").hide();

        }else if(id=="manageUsers"){
            console.log("manageUsers");
            $(".manageUsersView").show();
            $(".manageUsersView").siblings("div").hide();
        }else if(id=="adminProfilePic"){
            $("#adminProfile").show();
            $("#adminProfile").siblings("div").hide();
        }
    });


});
