//The following pertains specifically to the edit page of the user
//Global boolean variable
var passwordchanged=false;
$(function () {

    //when the button to change password is clicked
    $(".changepwd").eq(0).click(function () {
        $(this).remove();
        $("#lastItem").after("<div class='form-group row'>" +
            "<label class='col-xs-2 col-form-label'>New Password</label>" +
            "<div class='col-xs-10'>" +
            "<input class='form-control' type='password' id='password'  required>" +
            "</div>" +
            "</div>"
        );
        passwordchanged=true;

    });

    $("#updateBtn").click(function () {
        
        var userId=$("#username").parent().attr("id");
        var userData={};
        userData.local={};

        //The following lines collect the updated information from the form
        userData.local.email=$("#email").val();

        //check if the admin changed the password
        var temp=$("#password").val();
        if(temp == undefined){
            console.log($(".changepwd").eq(0).attr("id"));
            userData.local.password=$(".changepwd").eq(0).attr("id");
        }else{
            userData.local.password=$("#password").val();
        }
        userData.local.username=$("#username").val();
        userData.local.stunum=$("#stunum").val();
        userData.local.birthday=$("#birthday").val();
        userData.gender=$("#gender").val();
        userData.givenname=$("#givenname").val();
        userData.familyname=$("#familyname").val();
        userData.specialty=$("#selectInterest").val();

        $.post('/user?id='+userId, userData,  function(data) {
            console.log(data);
            
        }).fail(function(){
            console.log("There was an error");
        });


    });






});