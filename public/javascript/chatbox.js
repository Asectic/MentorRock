"use strict";

$(function () {

    var my_id = 1;
    var friend_id = 2;
    var my_pic = 'assets/img/face-3.jpg'
    var friend_pic = 'assets/img/tesla.jpg'
    var room_urls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var chatlog = [
        {
            "sender_id": "2",
            "text": "Hello how are you doing? How is it going with the new chapter? Any questions that I can help?",
            "file": "null",
            "time": 1
        },
        {
            "sender_id": "1",
            "text": "I have some problem with the experiment procedure. Could you please explain a little bit on the initial set-up. What is the importance of the callibration at the beginning, and what would be affected if we skip the tedious steps? Further, isn't it likely that we need to callibrate each time we do another round of observation given the criteria, it doesn't seem practical.",
            "file": "null",
            "time": 2
        },
        {
            "sender_id": "2",
            "text": "Yeah that's a good question!! I remember having similar confusiton while I first read that part. Well, in fact, I think it would be easier if you try to go through the whole procedure in your mind, and consider taking out one step, and compare what might go wrong. Maybe you can now describe the procedure to me, and let's discuss what really is a must and what is not, and why.",
            "file": "null",
            "time": 3
        },
        {
            "sender_id": "1",
            "text": "Oh that would be awesome, so from what I read, we should first .... and then ... so .... but.... XD Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, tenetur?",
            "file": "null",
            "time": 4
        }
    ];

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
            '<img src= ' + my_pic + ' alt="" class="icon-avatar">' +
            '</div>' +
            '<div class="message-body">' +
            '<div class="message-content pull-left">' + msgText + '</div>' +
            '</div>' +
            '</div>'
        );

        $('.chat-box').append(bubble);
    }


    //---------------------------------------------------------
    //------- scoket part ------------------------------------
    //---------------------------------------------------------

    // var id = Number(window.location.pathname.match(/\/chat\/(\d+)$/)[1]);
    var socket = io();

    var id = room_urls[7]; //room id

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

    $("#send-message-button").click(function () {
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
            var logitem_text = {
                "sender_id": my_id,
                "text": msgText,
                "file": "null",
                "time": "null"
            };
            //var logitem = JSON.parse(logitem_text);
        }

        // Clear input field
        $('#message-input').val("");
        showMessage("your msg is sent");
    });


    //    var query_entry = {
    //        user_one: this.attr(),
    //        user_two: mine_id
    //    }

    //    $.ajax({
    //        url: '/chat?chat=' + query_entry,
    //        type: "get",
    //        success: function (response) {
    //            $.get('/chatroom/id:reponse.id');
    //        },
    //        error: function (er) {
    //            BackErr(er);
    //        }
    //    });


});
