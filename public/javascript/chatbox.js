"use strict";

$(function () {
    // var id = Number(window.location.pathname.match(/\/chat\/(\d+)$/)[1]);
    // var socket = io();

    var my_id = 1;
    var friend_id = 2;

    var chatlog = [
        {
            "sender_id": "2",
            "receiver_id": "1",
            "text": "Hello how are you doing? How is it going with the new chapter? Any questions that I can help?",
            "file": "null",
            "time": 1
        },
        {
            "sender_id": "1",
            "receiver_id": "2",
            "text": "I have some problem with the experiment procedure. Could you please explain a little bit on the initial set-up. What is the importance of the callibration at the beginning, and what would be affected if we skip the tedious steps? Further, isn't it likely that we need to callibrate each time we do another round of observation given the criteria, it doesn't seem practical.",
            "file": "null",
            "time": 2
        },
        {
            "sender_id": "2",
            "receiver_id": "1",
            "text": "Yeah that's a good question!! I remember having similar confusiton while I first read that part. Well, in fact, I think it would be easier if you try to go through the whole procedure in your mind, and consider taking out one step, and compare what might go wrong. Maybe you can now describe the procedure to me, and let's discuss what really is a must and what is not, and why.",
            "file": "null",
            "time": 3
        },
        {
            "sender_id": "1",
            "receiver_id": "2",
            "text": "Oh that would be awesome, so from what I read, we should first .... and then ... so .... but.... XD Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, tenetur?",
            "file": "null",
            "time": 4
        }
    ];

    //    var data = JSON.stringify({
    //        my_id,
    //        friend_id,
    //        my_pic,
    //        friend_pic,
    //        friend_names,
    //        friend_pics,
    //        chatlog
    //    });

    var msg_input_field = document.getElementById("message-input");
    document.getElementById("send-message-button").onclick = function () {
        var logitem_text = {
            "sender_id": my_id,
            "receiver_id": friend_id,
            "text": msg_input_field.value,
            "file": "null",
            "time": "null"
        };
        //var logitem = JSON.parse(logitem_text);
        chatlog.push(logitem_text);
        msg_input_field.value = "";
        console.log(chatlog[chatlog.length - 1]);
    };

});
