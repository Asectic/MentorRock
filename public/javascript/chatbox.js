"use strict";

$(function () {
    $('.chat-body').hide();

    // global variables
    var my_id = null;
    var my_pic = null;
    var names = [];
    var pics = [];
    var ids = [];
    var room_ids = [];

    // initial setup
    $.get('/chatuser', function (data) {
        var user = data;
        my_id = user._id;
        my_pic = user.profilePicture;
        var contacts = user.contacts;
        for (var idx in contacts) {
            if (contacts.hasOwnProperty(idx)) {
                names.push(contacts[idx].name);
                pics.push(contacts[idx].pic);
                ids.push(contacts[idx].id);
                room_ids.push(contacts[idx].room_id);
            }
        }
    });

    // socket variables 
    var socket = io();
    var id = null; //room id, default

    //---------------------------------------------------------
    // Snackbar -------------------------------------------
    //---------------------------------------------------------
    var snackbar = document.getElementById("snackbar");

    // Toast a snackbar message
    // @param message is the message to be shown
    function showMessage(message) {
        snackbar.innerHTML = message;
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 2500);
    }


    //---------------------------------------------------------
    //functions def
    //---------------------------------------------------------
    function scrollToButtom() {
        $('.chat-box').scrollTop($('.chat-box').get(0).scrollHeight);
    }

    function createRihgtBubble(msgText, moment) {
        var bubble = $(
            '<div class="chat-bubble right">' +
            '<div class="pull-right">' +
            '<img src= ' + my_pic + ' alt="" class="icon-avatar">' +
            '</div>' +
            '<div class="message-body">' +
            '<div class="message-content pull-right">' + msgText + '</div>' +
            '</div>' +
            '</div>'
        );

        $('.chat-box').append(bubble);
    }

    function createLeftBubble(msgText) {
        var bubble = $(
            '<div class="chat-bubble left">' +
            '<div class="pull-left">' +
            '<img src= ' + friend_pic + ' alt="" class="icon-avatar">' +
            '</div>' +
            '<div class="message-body">' +
            '<div class="message-content pull-left">' + msgText + '</div>' +
            '</div>' +
            '</div>'
        );

        $('.chat-box').append(bubble);
    }

    function sendMessage() {
        var msgText = $("#message-input").val().trim();
        if (msgText.length) {
            // Creat my chat bubble
            createRihgtBubble(msgText);
            scrollToButtom();

            // Send the message to the other person in the chat
            socket.emit('msg', {
                msg: msgText,
                img: null
            });

            // Insert into db
            $.ajax({
                url: "/chat?room=" + id,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "sender_id": my_id,
                    "text": msgText,
                    "file": "null",
                    "time": "null"
                }),
                success: function (data) {
                    snackbarMessage("add chat to log");
                }
            });
        }

        // Clear input field
        $('#message-input').val("");
        showMessage("your msg is sent");
    }


    //---------------------------------------------------------
    //------- scoket part ------------------------------------
    //---------------------------------------------------------

    if (id) {

        socket.on('connect', function () {
            showMessage("connect");
            socket.emit('load', id); // room_id of the first user of the list
        });


        socket.on('peopleinchat', function (data) {
            // TODO: switch to the title of the friend you clicked
            if (data.number === 0) {
                // and a notice : that person is offline, please leave a message"
                showMessage("friend not connected");

            } else if (data.number === 1) {
                // and a notice : that person online. Start chatting"
                showMessage("friend connected");
            }
        });

        socket.on('leave', function (data) {
            if (data.boolean && id == data.room) {
                showMessage("friend left chat");
            }
        });


        socket.on('receive', function (data) {
            showMessage("receive a message");
            if (data.msg.trim().length) {
                // Create friend chat bubble
                createLeftBubble(data.msg);
                scrollToButtom();
            }
        });


        socket.on('startChat', function (data) {
            console.log(data);
            if (data.boolean && data.id == id) {
                showMessage("chat starts");
            }
        });



    }


    $("#message-input").keypress(function (e) {
        // send message on enter
        if (e.which == 13) {
            e.preventDefault();
            sendMessage();
        }

    });

    $("#send-message-button").click(function () {
        sendMessage();
    });


    // get chat log of a room
    //    function getChatLog(room_id) {
    //        var mdata;
    //        $.get('/chatlog?room=' + room_id, function (data) {
    //            console.log(data);
    //            mdata = data;
    //        });
    //        console.log(mdata);
    //        return mdata;
    //    }

    function getChatLog(room_id) {
        var data = $.ajax({
            type: "GET",
            url: '/chatlog?room=' + room_id,
            async: false
        }).resoponseText;

        console.log(data);
        return data;
    }

    function getChatLog(room_id, i) {
        var mdata;
        $.get('/chatlog?room=' + room_id, function (data) {
            callGetRoom(data, i);
        });
    }

    function callGetRoom(chatlog, i) {
        $.ajax({
            url: "/chat?room=" + id,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: {
                "my_id": my_id,
                "friend_id": ids[i],
                "my_pic": my_pic,
                "friend_pic": pics[i],
                "friend_name": names[i],
                "friend_names": names,
                "friend_pics": pics,
                "chatlog": chatlog
            },
            success: function (data) {
                showMessage("enter chatroom");
            },
            error: function (er) {
                console.log(er);
            }
        });
    }


    // clicking on a contact, go to a new chatroom
    $('.friend-list-item').click(function (e) {
        e.preventDefault();
        $('.chat-body').show();
        var i = $(this).attr("id");

        //        jQuery.ajaxSetup({
        //            async: false
        //        });

        getChatLog(room_ids[i], i);

    });


});
